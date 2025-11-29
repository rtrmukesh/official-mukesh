import { verifyToken } from "@/lib/jwt";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const token = authHeader.split(" ")[1];

    if (!token || token == null || token == "null") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userDetail = verifyToken(token);

    const body = await req.json();
    const { mediaId, targetText, replyText } = body;

    if (!mediaId || !targetText || !replyText) {
      return NextResponse.json({
        success: false,
        error: "Missing required fields",
      });
    }

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

    if (!integration) {
      return NextResponse.json(
        { error: "Integration not found" },
        { status: 404 }
      );
    }

    await prisma.autoReply.create({
      data: {
        mediaId,
        targetText,
        replyText,
        integrationId: integration?.id,
        media_url: body?.media_url,
        media_type: body?.media_type,
      },
    });

    return NextResponse.json({ success: true, message: "Auto reply saved!" });
  } catch (err) {
    console.error("API Error:", err);
    return NextResponse.json({ success: false, error: (err as Error).message });
  }
}

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
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

    if (!integration) {
      return NextResponse.json(
        { error: "Integration not found" },
        { status: 404 }
      );
    }

    const getAutoReplayList = await prisma.autoReply.findMany({
      where: {
        integrationId: integration?.id,
      },
    });

    return NextResponse.json({ success: true, data: getAutoReplayList });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const token = authHeader.split(" ")[1];

    if (!token || token == null || token == "null") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userDetail = verifyToken(token);

    const body = await req.json();
    const { mediaId, targetText, replyText } = body;

    if (!mediaId || !targetText || !replyText) {
      return NextResponse.json({
        success: false,
        error: "Missing required fields",
      });
    }

    if (
      !userDetail ||
      typeof userDetail === "string" ||
      !("user_id" in userDetail)
    ) {
      return NextResponse.json({ error: "Invalid Token" }, { status: 401 });
    }

    await prisma.autoReply.update({
      where: { id: body?.id }, // you need to specify which record to update
      data: {
        targetText,
        replyText,
        // alwaysReply: alwaysReply ?? false,
      },
    });

    return NextResponse.json({ success: true, message: "Auto reply Updated!" });
  } catch (err) {
    console.error("API Error:", err);
    return NextResponse.json({ success: false, error: (err as Error).message });
  }
}
