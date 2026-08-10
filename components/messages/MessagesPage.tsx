"use client";

import ConversationList from "./ConversationList";
import ChatWindow from "../chat/ChatWindow";

type MessagesPageProps = {
  currentUserId: string;
  conversationId?: string;
};

export default function MessagesPage({
  currentUserId,
  conversationId,
}: MessagesPageProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      <div className="flex h-full min-h-0">
        {/* Conversation history */}
        <div
          className={`h-full min-h-0 shrink-0 ${
            conversationId ? "hidden md:block" : "block"
          }`}
        >
          <ConversationList currentUserId={currentUserId} />
        </div>

        {/* Chat */}
        <div
          className={`h-full min-h-0 min-w-0 flex-1 ${
            conversationId ? "block" : "hidden md:flex"
          }`}
        >
          {conversationId ? (
            <ChatWindow
              conversationId={conversationId}
              currentUserId={currentUserId}
            />
          ) : (
            <div className="flex h-full flex-1 items-center justify-center text-sm text-gray-500">
              Select a conversation to start chatting.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
