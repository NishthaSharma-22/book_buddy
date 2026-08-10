"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type RequestBookButtonProps = {
  bookId: string;
  disabled?: boolean;
  status?: string;
};

export default function RequestBookButton({
  bookId,
  disabled = false,
  status = "available",
}: RequestBookButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const unavailable = status !== "available" || disabled;

  const handleRequestBook = async () => {
    if (unavailable || loading) return;

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
          data.error || "Failed to request book",
        );
      }

      router.push(
        `/books/messages/${data.conversationId}`,
      );
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
      disabled={unavailable || loading}
      className={`rounded-xl px-5 py-3 text-sm font-medium transition ${
        unavailable
          ? "cursor-not-allowed bg-gray-200 text-gray-500"
          : "bg-black text-white hover:bg-gray-800"
      }`}
    >
      {loading
        ? "Opening chat..."
        : status === "available"
          ? "Request this book"
          : status === "given-away"
            ? "Book given away"
            : status === "sold"
              ? "Book sold"
              : status === "lent"
                ? "Book lent"
                : "Book unavailable"}
    </button>
  );
}
