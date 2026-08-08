"use client";

import { capitalize } from "@/lib/utils";

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
  status: string;
  givenTo?: string;
  imageUrl?: string;
};

type MyBooksProps = {
  books: Book[];
};

export default function MyBooks({ books }: MyBooksProps) {
  if (books.length === 0) {
    return (
      <div className="mt-10 border border-dashed border-gray-300 p-12 text-center">
        <p className="text-gray-500">You haven't uploaded any books yet.</p>
      </div>
    );
  }

  return (
    <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {books.map((book) => (
        <div
          key={book._id}
          className="overflow-hidden border-black border-2 border-dashed bg-white"
        >
          {/* Book image */}
          <div className="flex h-48 items-center justify-center bg-light-yellow">
            {book.imageUrl ? (
              <img
                src={book.imageUrl}
                alt={book.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-4xl">📚</span>
            )}
          </div>

          {/* Book information */}
          <div className="p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="font-semibold text-gray-900">{book.title}</h2>

                {book.author && (
                  <p className="mt-1 text-sm text-gray-500">{book.author}</p>
                )}
              </div>

              <span className="rounded-full bg-light-lilac px-3 py-1 text-xs font-medium capitalize">
                {book.status}
              </span>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-md bg-light-lilac px-2 py-1 text-xs text-gray-600">
                {capitalize(book.subject)}
              </span>

              <span className="rounded-md bg-light-lilac px-2 py-1 text-xs text-gray-600">
                {capitalize(book.grade)}
              </span>

              <span className="rounded-md bg-light-lilac px-2 py-1 text-xs text-gray-600">
                {capitalize(book.condition)}
              </span>
            </div>

            {book.edition && (
              <p className="mt-3 text-xs text-gray-500">
                Edition: {book.edition}
              </p>
            )}

            {book.status === "given-away" && book.givenTo && (
              <p className="mt-3 text-sm text-gray-500">
                Given to:{" "}
                <span className="font-medium text-gray-700">
                  {book.givenTo}
                </span>
              </p>
            )}

            {/* Actions */}
            <div className="mt-5 flex gap-2">
              <button
                type="button"
                className="flex-1 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium hover:border-black"
              >
                Edit
              </button>

              <button
                type="button"
                className="flex-1 rounded-lg bg-dark-yellow px-4 py-2 text-sm font-medium hover:bg-light-yellow"
              >
                Manage
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
