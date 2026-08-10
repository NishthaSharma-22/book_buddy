"use client";

import {
  Show,
  SignInButton,
  SignUpButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import Image from "next/image";
import Link from "next/link";

export const Header = () => {
  const { user } = useUser();

  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!user?.id) return;

    // Load existing unread notifications
    const loadNotifications = async () => {
      try {
        const response = await fetch("/api/notifications");

        if (!response.ok) return;

        const notifications = await response.json();

        const unread = notifications.filter(
          (notification: { read: boolean }) => !notification.read,
        );

        setUnreadCount(unread.length);
      } catch (error) {
        console.error("Failed to load notifications:", error);
      }
    };

    loadNotifications();

    // Listen for new notifications
const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL);
    socket.emit("join-user", user.id);

    socket.on("new-notification", () => {
      setUnreadCount((count) => count + 1);
    });

    return () => {
      socket.disconnect();
    };
  }, [user?.id]);

    return (
      <header className="w-full px-4 sm:px-6">
        <div className="max-w-6xl mx-auto mt-5 flex h-16 items-center justify-between rounded-xl border-black border-2 border-b-8 bg-white px-4 sm:px-6">
          {/* TODO: MAKE A LOGO AND ADD IT HERE PLS */}
          <Link href="/" className="flex gap-1 items-center justify-center">
            <Image src="/bb-logo.png" alt="book_buddy" width={40} height={40} />
            <h1 className="text-lg font-bold">book_buddy</h1>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Show when="signed-out">
              <Link href="/" className="hover:underline decoration-wavy">
                browse
              </Link>
              <Link href="/" className="hover:underline decoration-wavy">
                how it works
              </Link>
              <div className="flex items-center gap-3">
                <SignUpButton>
                  <button className="rounded-full bg-[#d6d0ff] px-4 py-2 text-sm font-medium hover:opacity-90">
                    get started
                  </button>
                </SignUpButton>
              </div>
            </Show>
            <Show when="signed-in">
              <Link href="/books" className="hover:underline decoration-wavy">
                browse
              </Link>
              <Link
                href="/my-books"
                className="hover:underline decoration-wavy"
              >
                my books
              </Link>
              <div className="relative">
                <Link
                  href="/books/messages"
                  className="hover:underline decoration-wavy"
                >
                  messages
                </Link>

                {unreadCount > 0 && (
                  <span className="absolute -right-3 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold text-white">
                    {unreadCount}
                  </span>
                )}
              </div>
              <Link
                href="/books/add"
                className="bg-light-lilac rounded-xl p-2 hover:bg-light-yellow decoration-wavy"
              >
                add a book!
              </Link>
              <UserButton />
            </Show>
          </nav>
        </div>
      </header>
    );
};
