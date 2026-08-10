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
  status?: string;
};

type BrowseBooksProps = {
  books: Book[];
};

export function BrowseBooks({ books }: BrowseBooksProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [subject, setSubject] = useState("");
  const [grade, setGrade] = useState("");

  const filteredBooks = books.filter((book) => {
    const query = searchQuery.toLowerCase().trim();

    // Search filter
    const matchesSearch =
      !query ||
      book.title.toLowerCase().includes(query) ||
      book.author?.toLowerCase().includes(query) ||
      book.subject.toLowerCase().includes(query) ||
      book.grade.toLowerCase().includes(query) ||
      book.description.toLowerCase().includes(query);

    // Subject filter
    const matchesSubject =
      !subject ||
      book.subject.toLowerCase() === subject.toLowerCase();

    // Grade filter
    const matchesGrade =
      !grade ||
      book.grade.toLowerCase() === grade.toLowerCase();

    return matchesSearch && matchesSubject && matchesGrade;
  });

  return (
    <>
      <BookBar
        onSearch={setSearchQuery}
        onSubjectChange={setSubject}
        onGradeChange={setGrade}
      />

      {filteredBooks.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-gray-300 p-12 text-center">
          <p className="text-gray-500">
            No books match your search or filters.
          </p>
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