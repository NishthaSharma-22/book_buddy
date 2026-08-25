"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

type Conversation = {
  _id: string;
  participants: string[];
  bookId: {
    _id: string;
    title: string;
  };
  lastMessage?: string;
  lastMessageSenderId?: string;
  lastMessageAt?: string;
  readBy: string[];
  otherUser?: {
    id: string;
    name: string;
  };
};

type ConversationListProps = {
  currentUserId: string;
  onSelect?: () => void;
};

export default function ConversationList({
  currentUserId, onSelect
}: ConversationListProps) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const router = useRouter();
  const params = useParams();

  const selectedConversationId = params?.conversationId as string | undefined;

  useEffect(() => {
    async function loadConversations() {
      try {
        const response = await fetch("/api/conversations/user", {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch conversations");
        }

        const data = await response.json();

        setConversations(data);
      } catch (error) {
        console.error("Error loading conversations:", error);
      }
    }

    loadConversations();
  }, []);

  return (
    <div className="flex h-full w-full min-h-0 flex-col bg-white">
      {" "}
      <div className="border-b border-gray-200 px-5 py-4">
        <h2 className="text-lg font-semibold text-gray-900">Messages</h2>

        <p className="mt-1 text-sm text-dark-lilac">Your conversations</p>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto">
        {conversations.length === 0 ? (
          <div className="px-5 py-10 text-center text-sm text-gray-500">
            No conversations yet.
          </div>
        ) : (
          conversations.map((conversation) => {
            const isSelected = conversation._id === selectedConversationId;

            const otherUserId = conversation.participants.find(
              (id) => id !== currentUserId,
            );

            const isUnread = !conversation.readBy?.includes(currentUserId);

            return (
              <button
                key={conversation._id}
                type="button"
                onClick={() => {
                  router.push(`/books/messages/${conversation._id}`);
                  onSelect?.();
                }}
                className={`w-full border-b border-gray-100 px-5 py-4 text-left transition hover:bg-gray-50 ${
                  isSelected ? "bg-gray-50" : "bg-white"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100">
                    👤
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex flex-col">
                        <p className="line-clamp-2 text-sm font-semibold text-gray-900">
                          {conversation.bookId?.title || "Book conversation"}
                        </p>

                        <p className="mt-1 truncate text-sm text-gray-600">
                          {conversation.otherUser?.name || "User"}
                        </p>
                      </div>

                      {isUnread && (
                        <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-black" />
                      )}
                    </div>
                  </div>
                </div>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}
