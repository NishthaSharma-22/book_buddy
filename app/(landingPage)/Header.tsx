"use client";

import { Show, SignUpButton, UserButton, useUser } from "@clerk/nextjs";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import Image from "next/image";
import Link from "next/link";
import { CgClose } from "react-icons/cg";
import { IoMdMenu } from "react-icons/io";

export const Header = () => {
  const { user } = useUser();

  const [unreadCount, setUnreadCount] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!user?.id) return;

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
      <div className="mx-auto mt-5 flex h-16 max-w-6xl items-center justify-between rounded-xl border-2 border-black border-b-8 bg-white px-4 sm:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-1">
          <Image src="/bb-logo.png" alt="book_buddy" width={40} height={40} />
          <h1 className="text-lg font-bold">book_buddy</h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {/* Signed Out */}
          <Show when="signed-out">
            <Link href="/books" className="decoration-wavy hover:underline">
              browse
            </Link>

            <Link
              href="/how-it-works"
              className="decoration-wavy hover:underline"
            >
              how it works
            </Link>

            <SignUpButton>
              <button className="rounded-full bg-[#d6d0ff] px-4 py-2 text-sm font-medium hover:opacity-90">
                get started
              </button>
            </SignUpButton>
          </Show>

          {/* Signed In */}
          <Show when="signed-in">
            <Link href="/books" className="decoration-wavy hover:underline">
              browse
            </Link>

            <Link href="/my-books" className="decoration-wavy hover:underline">
              my books
            </Link>

            <div className="relative">
              <Link
                href="/books/messages"
                className="decoration-wavy hover:underline"
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
              className="rounded-xl bg-light-lilac p-2 decoration-wavy hover:bg-light-yellow"
            >
              add a book!
            </Link>

            <UserButton />
          </Show>
        </nav>

        {/* Mobile Header Controls */}
        <div className="flex items-center gap-3 md:hidden">
          {/* Signed In → User Avatar */}
          <Show when="signed-in">
            <UserButton />
          </Show>

          {/* Signed Out → Get Started */}
          <Show when="signed-out">
            <SignUpButton>
              <button className="rounded-full bg-[#d6d0ff] px-3 py-2 text-xs font-medium hover:opacity-90">
                get started
              </button>
            </SignUpButton>
          </Show>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border-2 border-black text-xl"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <CgClose /> : <IoMdMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="mx-auto mt-2 max-w-6xl rounded-xl border-2 border-black border-b-8 bg-white p-4 md:hidden">
          <nav className="flex flex-col gap-4">
            {/* Signed Out */}
            <Show when="signed-out">
              <Link href="/books" onClick={() => setMobileMenuOpen(false)}>
                browse
              </Link>

              <Link
                href="/how-it-works"
                onClick={() => setMobileMenuOpen(false)}
              >
                how it works
              </Link>

              <SignUpButton>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full rounded-full bg-[#d6d0ff] px-4 py-2 text-sm font-medium"
                >
                  get started
                </button>
              </SignUpButton>
            </Show>

            {/* Signed In */}
            <Show when="signed-in">
              <Link href="/books" onClick={() => setMobileMenuOpen(false)}>
                browse
              </Link>

              <Link href="/my-books" onClick={() => setMobileMenuOpen(false)}>
                my books
              </Link>

              <Link
                href="/books/messages"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2"
              >
                messages
                {unreadCount > 0 && (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold text-white">
                    {unreadCount}
                  </span>
                )}
              </Link>

              <Link
                href="/books/add"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-xl bg-light-lilac p-2 text-center hover:bg-light-yellow"
              >
                add a book!
              </Link>
            </Show>
          </nav>
        </div>
      )}
    </header>
  );
};
