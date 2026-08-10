"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type RequestBookButtonProps = {
  bookId: string;
};

export default function RequestBookButton({ bookId }: RequestBookButtonProps) {
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
        throw new Error(data.error || "Failed to create conversation");
      }

      router.push(`/books/messages/${data.conversationId}`);
    } catch (error) {
      console.error(error);
      alert("You cannot request your own book!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleRequestBook}
      disabled={loading}
      className="rounded-xl bg-black px-6 py-3 font-medium text-white hover:cursor-pointer hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {loading ? "Opening chat..." : "Request this book"}
    </button>
  );
}
