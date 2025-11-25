import { generateToken } from "@/lib/jwt";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();


    const { name, email, unique_id, profileUrl } = body;

    if (!email || !unique_id) {
      return new Response(
        JSON.stringify({ error: "Email and unique_id are required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Check if user exists by email or unique_id
    let user = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { google_unique_id: unique_id }],
      },
    });

    // Create new user if not exists
    if (!user) {
      user = await prisma.user.create({
        data: {
          name,
          email,
          google_unique_id: unique_id,
          profile_url: profileUrl || null,
        },
      });
    }

    const token = generateToken({
      unique_id: unique_id,
      email: user.email,
      user_id: user.id,
    });

    const response = NextResponse.json({
      success: true,
      user,
      isNewUser: user ? false : true,
      token: token
    });


    return response;
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Something went wrong" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
