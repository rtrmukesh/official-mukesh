"use client";

import { getSessionToken } from "@/app/actions/cookie-actions";
import AddButton from "@/components/AddButton";
import ResponsiveDrawer from "@/components/Modal";
import { useState } from "react";

type MediaItem = {
  createdAt: string;
  id: string;
  integrationId: string;
  mediaId: string;
  media_url: string;
  media_type: "IMAGE" | "VIDEO"; // <-- Add this
  replyText: string;
  targetText: string;
  updatedAt: string;
  alwaysReply?: boolean;
  caption?: string;
};

export default function InstagramAutoReplyList({
  mediaList,
  getAutoReplies,
}: {
  mediaList: MediaItem[];
  getAutoReplies: () => Promise<void>;
}) {
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleSave = async () => {
    if (!selectedMedia) return;

    try {
      const token = await getSessionToken();
      if (!token?.token) return;
      const res = await fetch("/api/instagram/autoCreate", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.token}`,
        },
        body: JSON.stringify(selectedMedia),
      });

      const result = await res.json();
      if (res.ok) {
        await getAutoReplies();
        setIsModalOpen(false);
      } else {
        console.error("Failed to create auto reply:", result);
      }
    } catch (err) {
      console.error("Error creating auto reply:", err);
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedMedia(
      selectedMedia
        ? { ...selectedMedia, alwaysReply: !selectedMedia?.alwaysReply }
        : null
    );
  };

  return (
    <div className="space-y-4 mt-5">
      <ResponsiveDrawer
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        {selectedMedia && (
          <div className="flex flex-col gap-4">
            <div className="w-full aspect-square overflow-hidden rounded-lg">
              {selectedMedia.media_type === "VIDEO" ? (
                <video
                  src={selectedMedia.media_url}
                  controls
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src={selectedMedia.media_url}
                  alt={selectedMedia.caption || "Instagram post"}
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Target Text</label>
              <input
                type="text"
                value={selectedMedia?.targetText}
                onChange={(e) =>
                  setSelectedMedia(
                    selectedMedia
                      ? { ...selectedMedia, targetText: e.target.value }
                      : null
                  )
                }
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Reply Text</label>
              <input
                type="text"
                value={selectedMedia?.replyText}
                onChange={(e) =>
                  setSelectedMedia(
                    selectedMedia
                      ? { ...selectedMedia, replyText: e.target.value }
                      : null
                  )
                }
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <label className="flex items-center gap-2 mt-1">
              <input
                type="checkbox"
                checked={selectedMedia?.alwaysReply || false}
                onChange={(e) => handleCheckboxChange(e)}
                className="w-4 h-4"
              />
              <span className="text-sm text-gray-700">Always Reply</span>
            </label>

            <button
              onClick={handleSave}
              className="bg-indigo-600 text-white rounded-lg py-2 hover:bg-indigo-700 transition"
            >
              Save
            </button>
          </div>
        )}
      </ResponsiveDrawer>
      {mediaList?.length > 0 ? (
        mediaList.map((item) => (
          <div
            key={item.id}
            className="flex items-start gap-4 border rounded-lg shadow p-3 bg-white"
          >
            {/* Media Preview */}
            {item.media_type === "VIDEO" ? (
              <video
                src={item.media_url}
                className="w-32 h-32 object-cover rounded-md"
              />
            ) : (
              <img
                src={item.media_url}
                alt={item.mediaId}
                className="w-32 h-32 object-cover rounded-md"
              />
            )}

            {/* Content */}
            <div className="flex-1">
              <p className="text-sm text-gray-600">
                <strong>Trigger:</strong> {item.targetText}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                <strong>Reply:</strong> {item.replyText}
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Created: {new Date(item.createdAt).toLocaleString()}
              </p>
            </div>
            <AddButton
              onClick={() => {
                setSelectedMedia(item);
                setIsModalOpen(true);
              }}
              label="Edit"
            />
          </div>
        ))
      ) : (
        <p className="text-gray-500">No Auto Replies Found</p>
      )}
    </div>
  );
}
