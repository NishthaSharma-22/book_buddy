"use client";

import { useState } from "react";

type Props = {
  bookId: string;
  currentStatus: string;
};

const statuses = [
  { value: "available", label: "Available" },
  { value: "given-away", label: "Given away" },
  { value: "sold", label: "Sold" },
  { value: "lent", label: "Lent" },
  { value: "archived", label: "Archived" },
];

export default function BookStatusControl({ bookId, currentStatus }: Props) {
  const [status, setStatus] = useState(currentStatus);
  const [loading, setLoading] = useState(false);

  const updateStatus = async (newStatus: string) => {
    try {
      setLoading(true);

      const response = await fetch(`/api/books/${bookId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: newStatus,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to update status");
      }

      setStatus(newStatus);
    } catch (error) {
      console.error(error);
      alert(error instanceof Error ? error.message : "Failed to update status");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4">
      <label className="mb-2 block text-sm font-medium text-gray-700">
        Book status
      </label>

      <select
        value={status}
        disabled={loading}
        onChange={(e) => updateStatus(e.target.value)}
        className="rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-gray-500"
      >
        {statuses.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  );
}
