"use server";

import { cookies } from "next/headers";

// SET COOKIE
export async function setSessionToken(token: string) {
  (await cookies()).set("verifyToken", token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: 4 * 60 * 60, 
  });

  return { success: true };
}

// GET COOKIE
export async function getSessionToken() {
  const token = (await cookies()).get("verifyToken")?.value || null;
  return { token };
}

// DELETE COOKIE
export async function deleteSessionToken() {
  (await cookies()).delete("verifyToken");
  return { success: true };
}
