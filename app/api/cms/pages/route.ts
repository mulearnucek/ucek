import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

async function verifyAuth(req: NextRequest) {
  const sessionCookie = req.cookies.get("cms_session")?.value;
  if (!sessionCookie) return false;
  try {
    const secret = new TextEncoder().encode(process.env.DASHBOARD_SECRET);
    await jwtVerify(sessionCookie, secret);
    return true;
  } catch {
    return false;
  }
}

const getGithubHeaders = () => ({
  Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
  Accept: "application/vnd.github.v3+json",
  "X-GitHub-Api-Version": "2022-11-28",
});

const githubApiBase = `https://api.github.com/repos/${process.env.GITHUB_OWNER}/${process.env.GITHUB_REPO}`;

export async function GET(req: NextRequest) {
  if (!(await verifyAuth(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const path = searchParams.get("path");

  if (path) {
    const res = await fetch(`${githubApiBase}/contents/${path}?ref=${process.env.GITHUB_BRANCH}`, { headers: getGithubHeaders() });
    if (!res.ok) return NextResponse.json({ error: "File not found" }, { status: 404 });
    const data = await res.json();
    return NextResponse.json({ 
       content: Buffer.from(data.content, "base64").toString("utf-8"),
       sha: data.sha 
    });
  }

  try {
    const branchRes = await fetch(`${githubApiBase}/branches/${process.env.GITHUB_BRANCH}`, { headers: getGithubHeaders(), cache: 'no-store' });
    const branchData = await branchRes.json();
    const treeSha = branchData.commit.commit.tree.sha;

    const treeRes = await fetch(`${githubApiBase}/git/trees/${treeSha}?recursive=1`, { headers: getGithubHeaders(), cache: 'no-store' });
    const treeData = await treeRes.json();

    const files = treeData.tree
      .filter((item: any) => item.path.startsWith("contents/") && item.type === "blob")
      .map((item: any) => ({
        path: item.path,
        sha: item.sha,
        size: item.size
      }));

    return NextResponse.json({ files });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// BATCH UPDATE: saves multiple files + metadata.json in a single commit
export async function PATCH(req: NextRequest) {
  if (!(await verifyAuth(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { updates, deletes, message } = await req.json();
    // updates: { [path]: content }
    // deletes: [path1, path2]

    // 1. Get current branch ref
    const refRes = await fetch(`${githubApiBase}/git/refs/heads/${process.env.GITHUB_BRANCH}`, { headers: getGithubHeaders(), cache: 'no-store' });
    const refData = await refRes.json();
    const currentCommitSha = refData.object.sha;

    // 2. Get current commit tree
    const commitRes = await fetch(`${githubApiBase}/git/commits/${currentCommitSha}`, { headers: getGithubHeaders() });
    const commitData = await commitRes.json();
    const baseTreeSha = commitData.tree.sha;

    // 3. Fetch current metadata.json if exists
    let metadata: Record<string, string> = {};
    const metaPath = "contents/metadata.json";
    const metaRes = await fetch(`${githubApiBase}/contents/${metaPath}?ref=${process.env.GITHUB_BRANCH}`, { headers: getGithubHeaders() });
    if (metaRes.ok) {
      const metaData = await metaRes.json();
      try {
        metadata = JSON.parse(Buffer.from(metaData.content, "base64").toString("utf-8"));
      } catch (e) {
        metadata = {};
      }
    }

    // 4. Update metadata and build new tree elements
    const tree: any[] = [];
    const now = new Date().toISOString();

    for (const [path, content] of Object.entries(updates)) {
      if (path !== metaPath) metadata[path] = now;
      tree.push({
        path,
        mode: "100644",
        type: "blob",
        content: content as string
      });
    }

    if (deletes) {
      for (const path of deletes) {
        delete metadata[path];
        tree.push({
          path,
          mode: "100644",
          type: "blob",
          sha: null // setting sha to null deletes the file
        });
      }
    }

    // Add metadata.json to tree
    tree.push({
      path: metaPath,
      mode: "100644",
      type: "blob",
      content: JSON.stringify(metadata, null, 2)
    });

    // 5. Create new tree
    const createTreeRes = await fetch(`${githubApiBase}/git/trees`, {
      method: "POST",
      headers: getGithubHeaders(),
      body: JSON.stringify({
        base_tree: baseTreeSha,
        tree
      })
    });
    if (!createTreeRes.ok) throw new Error("Failed to create tree");
    const newTreeData = await createTreeRes.json();

    // 6. Create commit
    const createCommitRes = await fetch(`${githubApiBase}/git/commits`, {
      method: "POST",
      headers: getGithubHeaders(),
      body: JSON.stringify({
        message: message || "Batch update CMS pages",
        tree: newTreeData.sha,
        parents: [currentCommitSha]
      })
    });
    if (!createCommitRes.ok) throw new Error("Failed to create commit");
    const newCommitData = await createCommitRes.json();

    // 7. Update branch ref
    const updateRefRes = await fetch(`${githubApiBase}/git/refs/heads/${process.env.GITHUB_BRANCH}`, {
      method: "PATCH",
      headers: getGithubHeaders(),
      body: JSON.stringify({
        sha: newCommitData.sha,
        force: false
      })
    });
    if (!updateRefRes.ok) throw new Error("Failed to update branch reference");

    return NextResponse.json({ success: true, sha: newCommitData.sha });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
