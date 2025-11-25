"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // For Next.js 13+ App Router
import { getSessionToken } from "../actions/cookie-actions";

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      const { token } = await getSessionToken();

      if (!token) {
        router.replace("/login");
      } else {
        setLoading(false);
      }
    };

    checkToken();
  }, [router]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return <h1>Dashboard Loaded Successfully</h1>;
}
