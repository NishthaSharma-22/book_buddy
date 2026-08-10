import { capitalize, getPastelColor } from "@/lib/utils";
import Link from "next/link";

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

type BookCardProps = {
  book: Book;
};

export function BookCard({ book }: BookCardProps) {
  const isAvailable = book.status === "available";

  const statusLabel =
    book.status === "given-away"
      ? "Given away"
      : book.status === "sold"
        ? "Sold"
        : book.status === "lent"
          ? "Currently lent"
          : book.status === "archived"
            ? "Unavailable"
            : null;

  return (
    <Link
      href={`/books/${book._id}`}
      className={`overflow-hidden border-dashed border-black border-2 bg-white transition ${
        isAvailable
          ? "hover:-translate-y-1 hover:cursor-pointer"
          : "opacity-60 grayscale"
      }`}
    >
      {/* Book image */}
      {book.imageUrl ? (
        <div className="relative h-56 w-full">
          <img
            src={book.imageUrl}
            alt={book.title}
            className="h-full w-full object-cover"
          />
        </div>
      ) : (
        <div
          className={`flex h-56 w-full items-center justify-center ${getPastelColor(
            book._id,
          )}`}
        >
          <span className="text-5xl">📚</span>
        </div>
      )}

      {/* Book information */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="font-semibold text-gray-900">
              {book.title}
            </h2>

            {book.author && (
              <p className="mt-1 text-sm text-gray-500">
                {book.author}
              </p>
            )}
          </div>

          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium capitalize">
            {book.exchangeType}
          </span>
        </div>

        {/* Status */}
        {statusLabel && (
          <div className="mt-3">
            <span className="rounded-full bg-gray-200 px-3 py-1 text-xs font-medium text-gray-600">
              {statusLabel}
            </span>
          </div>
        )}

        <div className="mt-4 flex flex-wrap gap-2">
          <span className="rounded-md bg-gray-50 px-2 py-1 text-xs text-gray-600">
            {capitalize(book.subject)}
          </span>

          <span className="rounded-md bg-gray-50 px-2 py-1 text-xs text-gray-600">
            {capitalize(book.grade)}
          </span>

          <span className="rounded-md bg-gray-50 px-2 py-1 text-xs text-gray-600 capitalize">
            {capitalize(book.condition)}
          </span>
        </div>

        {book.edition && (
          <p className="mt-3 text-xs text-gray-500">
            Edition: {book.edition}
          </p>
        )}
      </div>
    </Link>
  );
}
