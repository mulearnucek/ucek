// app/[slug]/page.js

import fs from "fs";
import path from "path";
import Topnav from "@/components/header/topnav";
import Nav from "@/components/header/nav";
import Footer from "@/components/layout/footer";

import Image from "next/image";
import ucekImage from "@/public/img/ucek.jpeg";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

const contentDir = path.join(process.cwd(), "contents");

export async function generateStaticParams() {
  const sections = fs.readdirSync(contentDir);

  const paths = sections.flatMap((section) => {
    if (section == "metadata.json") return
    const articles = fs.readdirSync(path.join(contentDir, section));
    return articles.map((article) => {
      return {
        id: article.replace(/\.md$/, ""),
        section: section,
      };
    });
  });
  return paths;
}

export async function generateMetadata({
  params,
}: {
  params: { id: string; section: string };
}) {
  const fullPath = path.join(contentDir, params.section, `${params.id}.md`);
  let title, content;

  try {
    const fileContents = fs.readFileSync(fullPath, "utf8");
    title = fileContents.split("\n", 1)[0];
    content = fileContents.split("\n").slice(1).join("\n");
  } catch (e) {
    title = "404";
    content = "Page not found. That's all we know. :-(";
  }

  return {
    title: title,
    description: content,
  };
}

const getArticle = ({ id, section }: { id: string; section: string }) => {
  const fullPath = path.join(contentDir, section, `${id}.md`);
  let title, content, lastUpdated;

  try {
    const fileContents = fs.readFileSync(fullPath, "utf8");
    title = fileContents.split("\n", 1)[0];
    content = fileContents.split("\n").slice(1).join("\n");

    // Get last updated date for metadata.json
    const metadataPath = path.join(contentDir, "metadata.json");
    const metadata = JSON.parse(fs.readFileSync(metadataPath, "utf8"));
    lastUpdated = new Date(metadata[section][`${id}.md`]).toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });

  } catch (e) {
    title = "404";
    content = "Page not found. That's all we know. :-(";
    lastUpdated = "";
  }

  return { title, content, lastUpdated } as { title: string; content: string, lastUpdated: string };
};

export default async function Post({
  params,
}: {
  params: { id: string; section: string };
}) {
  const { title, content, lastUpdated } = getArticle(params);

if(title == "404") return notFound();

  return (
    <>
      <Topnav />
      <Nav />
      <div className="h-[30%] relative text-center -z-20">
        <Image
          src={ucekImage}
          width={1920}
          height={1080}
          alt="Slider Image 1"
          className="h-[300px] w-full object-cover brightness-50"
        />
        <div className="absolute w-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white">
          <h1 className="text-2xl font-bold text-primary-foreground sm:text-4xl md:text-5xl">
            {title}
          </h1>
          <p className="text-xs md:text-lg text-slate-200">
            {title == "404"
              ? content
              : (params.section == "departments" ||
                  params.section == "about") &&
                "University College of Engineering, Kariavattom"}
          </p>
        </div>
      </div>
      <div className="z-20 w-full p-5 flex justify-center">
        {title != "404" && (
          <Markdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            className={"prose"}
          >
            {content}
          </Markdown>
        )}

      </div>
      {lastUpdated != "" && <div className="flex text-xs justify-center md:text-sm md:justify-end mr-2 mb-2 text-slate-400">
        Last Updated: {lastUpdated}
      </div>}
      <Footer />
    </>
  );
}
