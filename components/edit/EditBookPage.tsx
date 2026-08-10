"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { BookDetailsForm } from "@/components/books/BookDetailsForm";
import { ExchangeTypeSelector } from "@/components/books/ExchangeTypeSelector";

type Book = {
  _id: string;
  title: string;
  author?: string;
  isbn?: string;
  subject: string;
  grade: string;
  edition?: string;
  condition: string;
  description?: string;
  exchangeType: string;
  institutionId?: string;
  imageUrl?: string;
};

type EditBookFormProps = {
  book: Book;
};

export default function EditBookForm({ book }: EditBookFormProps) {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: book.title || "",
    author: book.author || "",
    isbn: book.isbn || "",
    subject: book.subject || "",
    grade: book.grade || "",
    edition: book.edition || "",
    condition: book.condition || "",
    description: book.description || "",
    exchangeType: book.exchangeType || "",
    institutionId: book.institutionId || "",
    imageUrl: book.imageUrl || "",
    imageFile: null as File | null,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const updateField = (field: string, value: string | File) => {
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
      let imageUrl = formData.imageUrl;

      // Upload a new image if the user selected one
      if (formData.imageFile) {
        const imageData = new FormData();

        imageData.append("file", formData.imageFile);

        const uploadResponse = await fetch("/api/upload", {
          method: "POST",
          body: imageData,
        });

        const uploadResult = await uploadResponse.json();

        if (!uploadResponse.ok) {
          throw new Error(
            uploadResult.error || "Failed to upload image",
          );
        }

        imageUrl = uploadResult.imageUrl;
      }

      const response = await fetch(`/api/books/${book._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.title,
          author: formData.author,
          isbn: formData.isbn,
          subject: formData.subject,
          grade: formData.grade,
          edition: formData.edition,
          condition: formData.condition,
          description: formData.description,
          exchangeType: formData.exchangeType,
          institutionId: formData.institutionId,
          imageUrl,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Failed to update book",
        );
      }

      setMessage("Book updated successfully!");

      // Take the user back to the book page
      setTimeout(() => {
        router.push(`/books/${book._id}`);
        router.refresh();
      }, 500);
    } catch (error) {
      console.error("Error updating book:", error);

      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h1 className="text-4xl font-bold">Edit Book</h1>

        <p className="mt-2 text-gray-500">
          Update the details of your book.
        </p>
      </div>

      <BookDetailsForm
        formData={formData}
        updateField={updateField}
      />

      <ExchangeTypeSelector
        value={formData.exchangeType}
        onChange={(value) =>
          updateField("exchangeType", value)
        }
      />

      {message && (
        <p className="mt-4 rounded-lg bg-gray-100 p-4 text-sm">
          {message}
        </p>
      )}

      <div className="mt-6 flex gap-3">
        <button
          type="button"
          onClick={() => router.back()}
          className="w-full rounded-xl border-2 border-black px-6 py-4 font-medium transition hover:bg-gray-100"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-black px-6 py-4 font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
