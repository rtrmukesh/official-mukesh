import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

const NEXT_PUBLIC_INSTAGRAM_APP_ID = process.env.NEXT_PUBLIC_INSTAGRAM_APP_ID;
const NEXT_PUBLIC_INSTAGRAM_APP_SECRET = process.env.NEXT_PUBLIC_INSTAGRAM_APP_SECRET;
const REDIRECT_URI = process.env.NEXT_PUBLIC_INSTAGRAM_REDIRECT_URI; // Add in .env

class InstagramService {
  static async getLongAccessToken(shortToken: string) {
    const longResp = await fetch(
      `https://graph.facebook.com/v21.0/oauth/access_token?` +
        `grant_type=fb_exchange_token` +
        `&client_id=${NEXT_PUBLIC_INSTAGRAM_APP_ID}` +
        `&client_secret=${NEXT_PUBLIC_INSTAGRAM_APP_SECRET}` +
        `&fb_exchange_token=${shortToken}`
    );

    const longToken = await longResp.json();
    return longToken?.access_token;
  }

  static async callback(code: string, userParam: any) {
    try {
      const tokenUrl = `https://graph.facebook.com/v21.0/oauth/access_token`;

      const params = new URLSearchParams({
        client_id: NEXT_PUBLIC_INSTAGRAM_APP_ID || "",
        client_secret: NEXT_PUBLIC_INSTAGRAM_APP_SECRET || "",
        redirect_uri: REDIRECT_URI || "",
        code,
      });

      const response = await fetch(`${tokenUrl}?${params.toString()}`, {
        method: "GET",
      });

      const data = await response.json();

      const getLongToken = await InstagramService.getLongAccessToken(
        data?.access_token
      );

      /* ✴---create integration Record---✴ */
      await prisma.integration.create({
        data: {
          access_token: getLongToken,
          user_id: userParam?.user_id,
          object_name: "INSTAGRAM",
          object_id: userParam?.user_id,
        },
      });

      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/instagram`);
    } catch (error) {
      console.log(error);
    }
  }
}
export default InstagramService;
