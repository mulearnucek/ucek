import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function GET(req: NextRequest) {
  const sessionCookie = req.cookies.get("cms_session")?.value;
  if (!sessionCookie) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  try {
    const secret = new TextEncoder().encode(process.env.DASHBOARD_SECRET);
    const { payload } = await jwtVerify(sessionCookie, secret);
    return NextResponse.json({ user: payload });
  } catch (error) {
    return NextResponse.json({ user: null }, { status: 401 });
  }
}
