import { NextRequest, NextResponse } from "next/server";
import { SignJWT } from "jose";
import Papa from "papaparse";

export async function POST(req: NextRequest) {
  try {
    const { credential } = await req.json();
    if (!credential) {
      return NextResponse.json({ error: "No credential provided" }, { status: 400 });
    }

    // Verify Google ID Token
    const response = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${credential}`);
    if (!response.ok) {
      return NextResponse.json({ error: "Invalid credential" }, { status: 401 });
    }

    const payload = await response.json();
    const email = payload.email;
    if (!email) {
       return NextResponse.json({ error: "No email in credential" }, { status: 400 });
    }

    // Check if email is in the allowed list from Google Sheet
    const sheetId = process.env.ADMIN_SHEET_ID;
    const sheetUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv`;
    const sheetRes = await fetch(sheetUrl);
    if (!sheetRes.ok) {
       return NextResponse.json({ error: "Failed to fetch allowed emails" }, { status: 500 });
    }

    const csvText = await sheetRes.text();
    const parsed = Papa.parse(csvText, { header: false });
    // Assuming emails are in the first column. Handle quotes if necessary.
    const allowedEmails = parsed.data
      .map((row: any) => row[0]?.toString().trim().toLowerCase())
      .filter(Boolean);

    if (!allowedEmails.includes(email.toLowerCase())) {
        return NextResponse.json({ error: "Email not authorized", email }, { status: 403 });
    }

    // Create session JWT
    const secret = new TextEncoder().encode(process.env.DASHBOARD_SECRET);
    const alg = 'HS256';

    const jwt = await new SignJWT({ email, name: payload.name, picture: payload.picture })
      .setProtectedHeader({ alg })
      .setIssuedAt()
      .setExpirationTime('24h')
      .sign(secret);

    const res = NextResponse.json({ success: true, user: { email, name: payload.name, picture: payload.picture } });
    res.cookies.set("cms_session", jwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 24 hours
      path: "/",
    });

    return res;
  } catch (error: any) {
    console.error("Login error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
