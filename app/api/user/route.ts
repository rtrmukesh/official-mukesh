import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Request Body>>>", body);

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

    return new Response(
      JSON.stringify({ success: true, user, isNewUser: user ? false : true }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Something went wrong" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
