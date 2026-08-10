"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type RequestBookButtonProps = {
  bookId: string;
};

export default function RequestBookButton({
  bookId,
}: RequestBookButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleRequestBook = async () => {
    try {
      setLoading(true);

      const response = await fetch("/api/conversations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bookId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Failed to create conversation",
        );
      }

      router.push(`/books/messages/${data.conversationId}`);
    } catch (error) {
      console.error("Request book error:", error);

      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("Failed to request this book.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleRequestBook}
      disabled={loading}
      className="rounded-xl bg-black px-5 py-3 text-sm font-medium text-white disabled:opacity-50"
    >
      {loading ? "Opening chat..." : "Request this book"}
    </button>
  );
}
