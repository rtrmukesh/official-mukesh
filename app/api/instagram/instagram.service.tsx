import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";




const igClientId = process.env.INSTAGRAM_CLIENT_ID!;
const igClientSecret = process.env.INSTAGRAM_CLIENT_SECRET!;
const igRedirectUri = process.env.INSTAGRAM_REDIRECT_URI!;

class InstagramService {

  static async getShortToken(code: string) {

    const tokenResponse = await fetch(
      `https://api.instagram.com/oauth/access_token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          client_id: igClientId,
          client_secret: igClientSecret,
          grant_type: "authorization_code",
          redirect_uri: igRedirectUri,
          code: code,
        }),
      }
    );

    const shortToken = await tokenResponse.json();
    return shortToken;
  }

  static async getLongAccessToken(shortToken: string) {
    const longResp = await fetch(
      `https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret=${igClientSecret}&access_token=${shortToken}`
    );
    const longToken = await longResp.json();
    return longToken;
  }

  static async callback(code: string, userParam: any) {
    try {

      const shortTokenRes = await InstagramService.getShortToken(code)

      if (!shortTokenRes.access_token) {
        return NextResponse.json(shortTokenRes, { status: 400 });
      }

      const longTokenResponse = await InstagramService.getLongAccessToken(shortTokenRes.access_token)


      const responses = await fetch(
        `https://graph.instagram.com/me?fields=id,username,account_type,media_count&access_token=${longTokenResponse?.access_token}`
      );

      const instagramResponse = await responses.json();

      /* ✴---create integration Record---✴ */
      await prisma.integration.create({
        data: {
          access_token: longTokenResponse?.access_token,
          user_id: userParam?.user_id,
          object_name: "INSTAGRAM",
          object_id: userParam?.user_id,
          insta_business_id: instagramResponse?.id,
          insta_user_name: instagramResponse?.username,
          insta_account_type: instagramResponse?.account_type
        },
      });

      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/instagram`);
    } catch (error) {
      console.log(error);
    }
  }
}
export default InstagramService;
