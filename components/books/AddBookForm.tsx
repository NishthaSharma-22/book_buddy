"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

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
    imageFile: null as File | null,
  });
  const router = useRouter();
  const [published, setPublished] = useState(false);

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
    let imageUrl = "";

    // 1. Upload image if one was selected
    if (formData.imageFile) {
      const imageData = new FormData();
      imageData.append("file", formData.imageFile);

      const uploadResponse = await fetch("/api/upload", {
        method: "POST",
        body: imageData,
      });

      const uploadResult = await uploadResponse.json();

      if (!uploadResponse.ok) {
        throw new Error(uploadResult.error || "Failed to upload image");
      }

      imageUrl = uploadResult.imageUrl;
    }

    // 2. Create the book
    const response = await fetch("/api/books", {
      method: "POST",
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
      throw new Error(data.error || "Failed to add book");
    }

    setMessage("Book published successfully!");
    setPublished(true);

    // 3. Reset form
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
      imageFile: null,
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

      <p className="mt-2 text-gray-500">
        Add the details of the book you want to share
      </p>

      <BookDetailsForm formData={formData} updateField={updateField} />

      <ExchangeTypeSelector
        value={formData.exchangeType}
        onChange={(value) => updateField("exchangeType", value)}
      />

      {message && (
        <p className="mt-4 rounded-lg bg-gray-100 p-4 text-sm">{message}</p>
      )}
      {!published ? (
        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-xl hover:cursor-pointer bg-black px-6 py-4 font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Publishing..." : "Publish Book"}
        </button>
      ) : (
        <div className="mt-6 flex gap-2">
          <button
            type="button"
            onClick={() => {
              setPublished(false);
              setMessage("");
            }}
            className="w-full rounded-xl bg-black px-6 py-4 font-medium text-white transition hover:cursor-pointer"
          >
            Add another book
          </button>
          <button
            type="button"
            onClick={() => router.push("/books")}
            className="w-full rounded-xl border border-dashed bg-light-lilac font-medium transition hover:cursor-pointer"
          >
            Check out your published book
          </button>
        </div>
      )}
    </form>
  );
}
