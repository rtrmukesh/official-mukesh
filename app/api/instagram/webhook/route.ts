import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

const VERIFY_TOKEN = "Sushsuga@5106";
const pageToken = process.env.INSTAGRAM_PAGE_ACCESS_TOKEN!;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("Webhook verified successfully!");
    return new Response(challenge, { status: 200 });
  } else {
    return new Response("Verification Failed", { status: 403 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const entry = body.entry?.[0];
    const change = entry?.changes?.[0];
    const value = change?.value;

    if (!value || change?.field !== "comments") {
      return NextResponse.json({ success: true });
    }

    const businessAccountId = entry.id;
    const commentId = value.id;
    const userId = value.from?.id;
    const username = value.from?.username;
    const text = value.text;

    const whereClause: any = {
      mediaId: value?.value?.media?.id,
    };

    const getAutoReplayList = await prisma.autoReply.findMany({
      where: whereClause,
      include: {
        integration: true,
      },
    });

    if (getAutoReplayList.length === 0) {
      return NextResponse.json({ success: true });
    }

    for (let i = 0; i < getAutoReplayList.length; i++) {
      const value = getAutoReplayList[i];

      if (value.targetText !== "All") {
        if (text == value.targetText) {
          await fetch(`https://graph.facebook.com/v21.0/${commentId}/replies`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              message: value?.replyText,
              access_token: pageToken,
            }),
          });
        }
      } else {
        await fetch(`https://graph.facebook.com/v21.0/${commentId}/replies`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: value?.replyText,
            access_token: pageToken,
          }),
        });
      }


      // await fetch(
      //   `https://graph.facebook.com/v21.0/${businessAccountId}/messages`,
      //   {
      //     method: "POST",
      //     headers: { "Content-Type": "application/json" },
      //     body: JSON.stringify({
      //       recipient: { id: userId },
      //       message: { text: `❤️ Hi @${username}! Thanks for commenting!` },
      //       access_token: value?.integration?.access_token,
      //     }),
      //   }
      // );
    }

    return NextResponse.json({
      success: true,
      action: "Reply + DM sent",
    });
  } catch (err: any) {
    console.error("Webhook Error:", err?.message);
    return NextResponse.json(
      { success: false, error: err?.message },
      { status: 500 }
    );
  }
}
