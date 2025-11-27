// app/api/instagram/feed/route.ts
import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const authHeader = req.headers.get("Authorization") || "";
  const token = authHeader.replace("Bearer ", "");

  const decoded = verifyToken(token);

  if (!decoded || typeof decoded === "string" || !("user_id" in decoded)) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  // Get Instagram integration from DB
  const integration = await prisma.integration.findFirst({
    where: { object_name: "INSTAGRAM", object_id: decoded.user_id },
  });

  if (!integration) {
    return NextResponse.json(
      { success: false, error: "Integration not found" },
      { status: 404 }
    );
  }

  const accessToken = integration.access_token;

  try {
    // Get the FB Page ID linked to this user
    const pageResp = await fetch(
      `https://graph.facebook.com/v24.0/me/businesses?access_token=${accessToken}`
    );
    const pageData = await pageResp.json();

    if (!pageData?.data?.length)
      return NextResponse.json({
        success: false,
        error: "No Facebook Pages found",
      });

    const pageId = pageData.data[0].id;

    // Get Instagram Business Account linked to that Page
    const igResp = await fetch(
      `https://graph.facebook.com/v24.0/${pageId}/instagram_business_accounts?access_token=${accessToken}`
    );
    const igData = await igResp.json();

    if (!igData?.data?.length)
      return NextResponse.json({
        success: false,
        error: "No Instagram Business Account found",
      });

    const igBusinessId = igData.data[0].id;

    const mediaResp = await fetch(
      `https://graph.facebook.com/v24.0/${igBusinessId}/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp&access_token=${accessToken}`
    );
    const mediaData = await mediaResp.json();
    return NextResponse.json({ success: true, data: mediaData.data || [] });
  } catch (err: any) {
    console.error("Error fetching Instagram media:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
