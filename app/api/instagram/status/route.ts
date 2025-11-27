import { verifyToken } from "@/lib/jwt";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const token = authHeader.split(" ")[1];

    if (!token || token == null || token == "null") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userDetail = verifyToken(token);

    if (
      !userDetail ||
      typeof userDetail === "string" ||
      !("user_id" in userDetail)
    ) {
      return NextResponse.json({ error: "Invalid Token" }, { status: 401 });
    }

    const integration = await prisma.integration.findFirst({
      where: {
        object_name: "INSTAGRAM",
        object_id: userDetail?.user_id,
      },
    });
    return NextResponse.json({
      success: integration ? true : false,
      userDetail,
    });
  } catch (error) {
    console.error("Auth Error:", error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
