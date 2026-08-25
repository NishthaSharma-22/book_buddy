"use client";

import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { FaExternalLinkAlt } from "react-icons/fa";

type Message = {
  _id?: string;
  senderId: string;
  text: string;
  conversationId: string;
  createdAt?: string;
};

type ChatWindowProps = {
  conversationId: string;
  currentUserId: string;
};

type Conversation = {
  _id: string;
  bookId?: {
    _id: string;
    title: string;
  };
};

export default function ChatWindow({
  conversationId,
  currentUserId,
}: ChatWindowProps) {
  const { user } = useUser();

  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const [conversation, setConversation] = useState<Conversation | null>(null);

  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL);
    socketRef.current = socket;

    const loadConversation = async () => {
      try {
        const response = await fetch(`/api/conversations/${conversationId}`);

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to load conversation");
        }

        setConversation(data);
      } catch (error) {
        console.error("Failed to load conversation:", error);
      }
    };

    // Load existing messages from MongoDB
    const loadMessages = async () => {
      try {
        setLoading(true);

        const response = await fetch(`/api/messages/${conversationId}`);

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to load messages");
        }

        setMessages(data);
      } catch (error) {
        console.error("Failed to load messages:", error);
      } finally {
        setLoading(false);
      }
    };

    loadConversation();
    loadMessages();

    socket.emit("join-conversation", conversationId);

    if (user?.id) {
      socket.emit("join-user", user.id);
    }

    socket.on("new-message", (message: Message) => {
      setMessages((prev) => {
        if (
          message._id &&
          prev.some((existing) => existing._id === message._id)
        ) {
          return prev;
        }

        return [...prev, message];
      });
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [conversationId, user?.id]);

  const sendMessage = () => {
    const trimmedText = text.trim();

    if (!trimmedText) return;

    const socket = socketRef.current;

    if (!socket) return;

    const message = {
      conversationId,
      senderId: currentUserId,
      text: trimmedText,
    };

    socket.emit("send-message", message);

    setText("");
  };

  return (
    <div className="flex h-full flex-col bg-white border-2 border-black">
      {/* Header */}
      <div className="shrink-0 border-b border-gray-200 p-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold">
              {conversation?.bookId?.title || "Book Request"}
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Chat with the book owner
            </p>
          </div>

          {conversation?.bookId?._id && (
            <Link
              href={`/books/${conversation.bookId._id}`}
              className="shrink-0 rounded-lg border bg-light-yellow px-3 py-2 text-sm font-medium transition hover:bg-gray-50 border-dashed border-2 border-black"
            >
              <div className="flex gap-2">
                <p>View Book</p>
                <FaExternalLinkAlt size={20} />
              </div>
            </Link>
          )}
        </div>
      </div>
      {/* Messages */}
      <div className="min-h-0 flex-1 overflow-y-auto p-5">
        {loading ? (
          <div className="flex h-full items-center justify-center">
            <p className="text-sm text-gray-500">Loading messages...</p>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex h-full items-center justify-center">
            <p className="text-sm text-gray-500">No messages yet.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {messages.map((message, index) => {
              const isOwnMessage = message.senderId === currentUserId;

              return (
                <div
                  key={message._id ?? index}
                  className={`flex ${
                    isOwnMessage ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                      isOwnMessage
                        ? "bg-dark-lilac text-white"
                        : "bg-gray-100 text-gray-900"
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.text}</p>

                    {message.createdAt && (
                      <p
                        className={`mt-1 text-[10px] ${
                          isOwnMessage ? "text-gray-300" : "text-gray-400"
                        }`}
                      >
                        {new Date(message.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      {/* Message input */}
      <div className="shrink-0 border-t border-gray-200 p-4">
        <div className="flex gap-3">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
            placeholder="Type a message..."
            className="flex-1 rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-gray-400"
          />

          <button
            type="button"
            onClick={sendMessage}
            disabled={!text.trim()}
            className="rounded-xl bg-black px-5 py-3 text-sm font-medium text-white transition hover:cursor-pointer hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
