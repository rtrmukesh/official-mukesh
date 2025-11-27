import { NextRequest, NextResponse } from "next/server";
import InstagramService from "../instagram.service";
import { verifyToken } from "@/lib/jwt";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code"); 
  const state = searchParams.get("state");

  if (!state) {
    return NextResponse.json(
      { error: "State parameter missing!" },
      { status: 400 }
    );
  }

  const userDetail = verifyToken(state);
  if (!code) {
    return NextResponse.json(
      { error: "Authorization code missing!" },
      { status: 400 }
    );
  }

  try {
    return await InstagramService.callback(code, userDetail);
  } catch (err: unknown) {
    return NextResponse.json(
      { error: "Server error", details: String(err) },
      { status: 500 }
    );
  }
}
