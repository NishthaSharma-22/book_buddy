"use client";

import { useState } from "react";
import BookBar from "../books/BookBar";
import { BookCard } from "./BookCard";

type Book = {
  _id: string;
  title: string;
  author?: string;
  subject: string;
  grade: string;
  edition?: string;
  condition: string;
  description: string;
  exchangeType: string;
  imageUrl?: string;
};

type BrowseBooksProps = {
  books: Book[];
};

export function BrowseBooks({ books }: BrowseBooksProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const filteredBooks = books.filter((book) => {
    const query = searchQuery.toLowerCase().trim();

    if (!query) return true;

    return (
      book.title.toLowerCase().includes(query) ||
      book.author?.toLowerCase().includes(query) ||
      book.subject.toLowerCase().includes(query) ||
      book.grade.toLowerCase().includes(query) ||
      book.description.toLowerCase().includes(query)
    );
  });

  return (
    <>
      <BookBar onSearch={setSearchQuery} />

      {filteredBooks.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-gray-300 p-12 text-center">
          <p className="text-gray-500">no books math your search</p>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredBooks.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      )}
    </>
  );
}
