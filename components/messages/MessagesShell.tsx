"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import ConversationList from "@/components/messages/ConversationList";

export default function MessagesShell({
  userId,
  children,
}: {
  userId: string;
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const params = useParams();
  const inConversation = !!params?.conversationId;

  return (
    <div className="mx-auto flex h-[calc(100vh-64px)] w-full max-w-4xl overflow-hidden border-x border-gray-200">
      {/* Mobile overlay backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      {/* Desktop sidebar — normal flex, never fixed */}
      <div className="hidden h-full w-64 min-w-64 shrink-0 border-r border-gray-200 md:block lg:w-80 lg:min-w-80">
        <ConversationList
          currentUserId={userId}
          onSelect={() => setSidebarOpen(false)}
        />
      </div>
      {/* Mobile sidebar — fixed drawer, hidden on desktop */}
      <div
        className={`fixed inset-y-0 left-0 z-30 h-full w-72 bg-white transition-transform md:hidden ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <ConversationList
          currentUserId={userId}
          onSelect={() => setSidebarOpen(false)}
        />
      </div>
      <div className="flex h-full min-w-0 flex-1 flex-col overflow-hidden">
        {/* Hamburger — mobile only */}
        <div className="flex items-center border-b border-gray-200 px-4 py-3 md:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="mr-3 text-gray-600"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <span className="text-sm font-medium text-gray-700">
            {inConversation ? "Chat" : "Messages"}
          </span>
        </div>
        <div className="min-h-0 flex-1 overflow-hidden">{children}</div>
      </div>
    </div>
  );
}
