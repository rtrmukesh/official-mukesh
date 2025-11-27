"use client";
import { getSessionToken } from "@/app/actions/cookie-actions";
import BlurLoader from "@/components/BlurLoader";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type MediaItem = {
  id: string;
  caption?: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  media_url: string;
  permalink: string;
  thumbnail_url?: string;
};

export default function InstagramFeed() {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"posts" | "reels">("reels");
  const router = useRouter();

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const token = await getSessionToken();
        if (!token?.token) return router.replace("/login");

        setLoading(true);
        const res = await fetch("/api/instagram/feed", {
          headers: { Authorization: `Bearer ${token.token}` },
        });
        const data = await res.json();
        if (data?.success && data?.data) setMedia(data.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching Instagram media:", err);
      }
    };

    fetchMedia();
  }, []);

  if (loading){
    return <BlurLoader isLoading={true} color="white" name="HashLoader" />;
  }

  const posts = media.filter((item) => item.media_type === "IMAGE");
  const reels = media.filter((item) => item.media_type === "VIDEO");

  const mainPreview = activeTab === "reels" ? reels : posts;
  return (
    <div>
      {/* Tabs */}
      <div style={{ display: "flex", marginBottom: 16 }}>
        <button
          onClick={() => setActiveTab("posts")}
          style={{
            flex: 1,
            padding: 8,
            backgroundColor: activeTab === "posts" ? "#3897f0" : "#eee",
            color: activeTab === "posts" ? "#fff" : "#000",
            border: "none",
            cursor: "pointer",
          }}
        >
          Posts
        </button>
        <button
          onClick={() => setActiveTab("reels")}
          style={{
            flex: 1,
            padding: 8,
            backgroundColor: activeTab === "reels" ? "#3897f0" : "#eee",
            color: activeTab === "reels" ? "#fff" : "#000",
            border: "none",
            cursor: "pointer",
          }}
        >
          Reels
        </button>
      </div>

      {/* Content */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 16,
        }}
      >
        {mainPreview.map((item) => (
          <a
            key={item.id}
            href={item.permalink}
            target="_blank"
            rel="noopener noreferrer"
          >
            {item.media_type === "VIDEO" ? (
              <video src={item.media_url} controls width="100%" />
            ) : (
              <img
                src={item.media_url}
                alt={item.caption || "Instagram post"}
                width="100%"
              />
            )}
            {item.caption && <p>{item.caption}</p>}
          </a>
        ))}
      </div>
    </div>
  );
}
