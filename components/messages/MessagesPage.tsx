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
    <div className="flex h-full min-h-0 w-full min-w-0 overflow-hidden md:w-full lg:w-[1200px] lg:min-w-[1200px] lg:max-w-[1200px]">
      {/* Conversation history */}
      <div
        className={`h-full min-h-0 w-full shrink-0 border-r border-gray-200 md:w-80 md:min-w-80 lg:w-80 lg:min-w-80 ${
          conversationId ? "hidden md:block" : "block"
        }`}
      >
        <ConversationList />
      </div>

      {/* Chat */}
      <div
        className={`h-full min-h-0 min-w-0 overflow-hidden md:flex-1 lg:w-[880px] lg:min-w-[880px] lg:max-w-[880px] lg:flex-none ${
          conversationId ? "block" : "hidden md:flex"
        }`}
      >
        {conversationId ? (
          <ChatWindow
            conversationId={conversationId}
            currentUserId={currentUserId}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-gray-500">
            <p>Select a conversation to start chatting</p>
          </div>
        )}
      </div>
    </div>
  );
}
