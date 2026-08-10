"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type BookOwnerControlsProps = {
  bookId: string;
};

export default function BookOwnerControls({
  bookId,
}: BookOwnerControlsProps) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this book? This cannot be undone.",
    );

    if (!confirmed) return;

    setDeleting(true);

    try {
      const response = await fetch(`/api/books/${bookId}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to delete book");
      }

      router.push("/my-books");
      router.refresh();
    } catch (error) {
      console.error("Delete book error:", error);

      alert(
        error instanceof Error
          ? error.message
          : "Something went wrong while deleting the book.",
      );

      setDeleting(false);
    }
  };

  return (
    <div className="mt-6 flex gap-3">
      {/* Edit */}
      <button
        type="button"
        onClick={() => router.push(`/books/${bookId}/edit`)}
        className="flex-1 rounded-xl border-2 border-black px-5 py-3 text-sm font-medium transition hover:bg-gray-100"
      >
        Edit book
      </button>

      {/* Delete */}
      <button
        type="button"
        onClick={handleDelete}
        disabled={deleting}
        className="flex-1 rounded-xl bg-red-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {deleting ? "Deleting..." : "Delete book"}
      </button>
    </div>
  );
}
