"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // For Next.js 13+ App Router
import { getSessionToken } from "../actions/cookie-actions";
import BlurLoader from "@/components/BlurLoader";

export default function DashboardPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      const { token } = await getSessionToken();

      if (!token) {
        router.replace("/login");
      } else {
        setIsLoading(false);
      }
    };

    checkToken();
  }, [router]);

    if(isLoading){
    return (
      <BlurLoader isLoading={true}/>
    )
  }

  return <h1>Dashboard Loaded Successfully</h1>;
}
