"use client";
import { useEffect, useState } from "react";
import { getSessionToken } from "../actions/cookie-actions";
import Connect from "./components/connect";
import InstagramFeed from "./components/InstagramFeed";
import { useRouter } from "next/navigation";
import BlurLoader from "@/components/BlurLoader";

export default function InstagramConnect() {
  const [loading, setLoading] = useState(false);
  const [encodedToken, setEncodedToken] = useState<string>("");
  const [isConnected, setIsConnected] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const getStatus = async () => {
      const token = await getSessionToken();

      if (!token?.token) {
        router.replace("/login");
      }
      setLoading(true);
      fetch(`/api/instagram/status`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token?.token}`,
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setIsConnected(data?.success);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
      setLoading(false);
    };

    const generateEncodeURI = async () => {
      const token = await getSessionToken();
      if (token?.token) {
        setEncodedToken(token?.token);
      }
    };
    getStatus();
    generateEncodeURI();
  }, []);

  const handleConnect = () => {
    // const url = `https://www.instagram.com/oauth/authorize?force_reauth=true&client_id=713048034752152&redirect_uri=${process.env.NEXT_PUBLIC_APP_URL}/api/instagram/callback&response_type=code&scope=instagram_business_basic%2Cinstagram_business_manage_messages%2Cinstagram_business_manage_comments%2Cinstagram_business_content_publish%2Cinstagram_business_manage_insights&state=${encodedToken}`;

   const url = `https://www.instagram.com/oauth/authorize?force_reauth=true&client_id=713048034752152&redirect_uri=https://opponents-quantity-outlet-roulette.trycloudflare.com/api/instagram/callback&response_type=code&scope=instagram_business_basic%2Cinstagram_business_manage_messages%2Cinstagram_business_manage_comments%2Cinstagram_business_content_publish%2Cinstagram_business_manage_insights`;




    window.location.href = url;
  };

   if (loading){
    return <BlurLoader isLoading={true} color="white" name="HashLoader" />;
  }


  return isConnected ? (
    <InstagramFeed />
  ) : (
    <Connect loading={loading} handleConnect={handleConnect} />
  );
}
