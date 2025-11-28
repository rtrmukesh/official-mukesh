import { NextRequest, NextResponse } from "next/server";

const VERIFY_TOKEN = "Sushsuga@5106";

// 🔹 Webhook Verification (GET)
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

// 🔹 Webhook Events Receiver (POST)
export async function POST(request: NextRequest) {
  const body = await request.json();
  console.log("Webhook event received:", JSON.stringify(body, null, 2));
  return NextResponse.json({ status: "EVENT_RECEIVED" }, { status: 200 });
}
