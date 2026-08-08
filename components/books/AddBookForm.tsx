"use client";

import { useState } from "react";
import { BookDetailsForm } from "./BookDetailsForm";
import { ExchangeTypeSelector } from "./ExchangeTypeSelector";

export function AddBookForm() {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    isbn: "",
    subject: "",
    grade: "",
    edition: "",
    condition: "",
    description: "",
    exchangeType: "",
    institutionId: "",
    imageUrl: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to add book");
      }

      setMessage("Book published successfully!");

      setFormData({
        title: "",
        author: "",
        isbn: "",
        subject: "",
        grade: "",
        edition: "",
        condition: "",
        description: "",
        exchangeType: "",
        institutionId: "",
        imageUrl: "",
      });

      console.log("Created book:", data.book);
    } catch (error) {
      console.error(error);

      setMessage(
        error instanceof Error ? error.message : "Something went wrong.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-3xl font-semibold">Add a Book</h1>

      <p className="mt-2 text-gray-500">Give your book a second life.</p>

      <BookDetailsForm formData={formData} updateField={updateField} />

      <ExchangeTypeSelector
        value={formData.exchangeType}
        onChange={(value) => updateField("exchangeType", value)}
      />

      {message && (
        <p className="mt-4 rounded-lg bg-gray-100 p-4 text-sm">{message}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="mt-6 w-full rounded-xl hover:cursor-pointer bg-black px-6 py-4 font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Publishing..." : "Publish Book"}
      </button>
    </form>
  );
}
