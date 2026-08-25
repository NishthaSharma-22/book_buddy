"use client";

import { useState, useEffect, useRef, useCallback } from "react";
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
  createdAt: string;
};

type BrowseBooksProps = {
  initialBooks: Book[];
  initialHasMore: boolean;
};

const LIMIT = 12;

export function BrowseBooks({
  initialBooks,
  initialHasMore,
}: BrowseBooksProps) {
  const [books, setBooks] = useState(initialBooks);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [subject, setSubject] = useState("");
  const [grade, setGrade] = useState("");
  const sentinelRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  const fetchBooks = useCallback(
    async (
      pageNum: number,
      searchVal: string,
      subjectVal: string,
      gradeVal: string,
      replace: boolean,
    ) => {
      setIsLoading(true);
      try {
        const params = new URLSearchParams({
          page: String(pageNum),
          limit: String(LIMIT),
        });
        if (searchVal) params.set("search", searchVal);
        if (subjectVal) params.set("subject", subjectVal);
        if (gradeVal) params.set("grade", gradeVal);

        const res = await fetch(`/api/books?${params}`);
        const data = await res.json();

        setBooks((prev) => (replace ? data.books : [...prev, ...data.books]));
        setHasMore(data.hasMore);
        setPage(pageNum);
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  // Refetch from page 1 when filters change (debounced for search)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const timer = setTimeout(() => {
      fetchBooks(1, search, subject, grade, true);
    }, 300);
    return () => clearTimeout(timer);
  }, [search, subject, grade, fetchBooks]);

  // Infinite scroll
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          fetchBooks(page + 1, search, subject, grade, false);
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasMore, isLoading, page, search, subject, grade, fetchBooks]);

  return (
    <>
      <BookBar
        onSearch={setSearch}
        onSubjectChange={setSubject}
        onGradeChange={setGrade}
      />

      {books.length === 0 && !isLoading ? (
        <div className="mt-10 rounded-2xl border border-dashed border-gray-300 p-12 text-center">
          <p className="text-gray-500">
            No books match your search or filters.
          </p>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {books.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      )}

      <div ref={sentinelRef} className="h-10 mt-4" />

      {isLoading && (
        <p className="mt-4 text-center text-sm text-gray-500">
          Loading more books...
        </p>
      )}

      {!hasMore && books.length > 0 && (
        <p className="mt-6 text-center text-sm text-gray-400">
          You've seen all the books
        </p>
      )}
    </>
  );
}
