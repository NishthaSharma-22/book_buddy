"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type RequestBookButtonProps = {
  bookId: string;
  disabled?: boolean;
  status?: string;
  hasUploadedBook?: boolean;
};

export default function RequestBookButton({
  bookId,
  disabled = false,
  status = "available",
  hasUploadedBook = true,
}: RequestBookButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const unavailable = status !== "available" || disabled;

  if (!hasUploadedBook) {
    return (
      <div className="rounded-xl border-2 border-dashed border-gray-300 p-4">
        <p className="text-sm font-medium text-gray-700">
          Want to request this book?
        </p>
        <p className="mt-1 text-sm text-gray-500">
          You need to upload at least one book first — give one to get one.
        </p>
        <button
          type="button"
          onClick={() => router.push("/books/add")}
          className="mt-3 rounded-xl bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
        >
          Upload a book first
        </button>
      </div>
    );
  }

  const handleRequestBook = async () => {
    if (unavailable || loading) return;

    try {
      setLoading(true);

      const response = await fetch("/api/conversations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bookId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to request book");
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
