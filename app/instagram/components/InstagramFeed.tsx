"use client";

import { getSessionToken } from "@/app/actions/cookie-actions";
import AddButton from "@/components/AddButton";
import BlurLoader from "@/components/BlurLoader";
import Container from "@/components/Container";
import Drawer from "@/components/Modal";
import { useEffect, useState } from "react";
import InstagramModelBody from "./InstagramModelBody";
import InstagramAutoReplyList from "./InstagramAutoReplyList";

export default function InstagramFeed() {
  const [loading, setLoading] = useState(false);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [autoCreateList, setAutoCreateList] = useState([]);

  const getAutoReplies = async () => {
    const token = await getSessionToken();
    if (!token?.token) return;
    setLoading(true);
    const res = await fetch("/api/instagram/autoCreate", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.token}`,
      },
    });

    const result = await res.json();
    setAutoCreateList(result?.data || []);
    setLoading(false);
  };

  useEffect(() => {
    getAutoReplies();
  }, []);

  const handleCreateAutoReply = async (data: {
    mediaId: string;
    targetText: string;
    replyText: string;
    media_url: string;
    media_type: string;
  }) => {
    try {
      const token = await getSessionToken();
      if (!token?.token) return;
      setLoading(true);
      const res = await fetch("/api/instagram/autoCreate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.token}`,
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (res.ok) {
        await getAutoReplies();
        setIsModelOpen(false);
        setLoading(false);
      } else {
        setLoading(false);
        console.error("Failed to create auto reply:", result);
      }
    } catch (err) {
      setLoading(false);
      console.error("Error creating auto reply:", err);
    }
  };

  if (loading) {
    return <BlurLoader isLoading={true} color="white" name="HashLoader" />;
  }

  return (
    <Container>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <AddButton
          label="Add Auto Reply"
          onClick={() => setIsModelOpen(true)}
          variant="primary"
        />
      </div>

      <Drawer isOpen={isModelOpen} onClose={() => setIsModelOpen(false)}>
        <InstagramModelBody handleSend={handleCreateAutoReply} />
      </Drawer>
      <InstagramAutoReplyList mediaList={autoCreateList} getAutoReplies={getAutoReplies} />
    </Container>
  );
}
