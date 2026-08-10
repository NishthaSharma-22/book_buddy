import { capitalize, getPastelColor } from "@/lib/utils";
import Image from "next/image";
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
  createdAt: string;
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
      className={`overflow-hidden border-2 border-dashed border-black bg-white transition ${
        isAvailable
          ? "hover:-translate-y-1 hover:cursor-pointer"
          : "opacity-60 grayscale"
      }`}
    >
      {/* Book image */}
      <div className="relative aspect-[4/5] w-full overflow-hidden">
        {book.imageUrl ? (
          <Image
            src={book.imageUrl}
            alt={book.title}
            fill
            className="object-cover"
          />
        ) : (
          <div
            className={`flex h-full w-full items-center justify-center ${getPastelColor(
              book._id,
            )}`}
          >
            📚
          </div>
        )}

        {/* Added date */}
        <span className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-gray-600 shadow-sm">
          Added{" "}
          {new Date(book.createdAt).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </span>
      </div>

      {/* Book information */}
      <div className="pr-3 pl-3 pt-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="font-semibold text-gray-900">{book.title}</h2>

            {book.author && (
              <p className="mt-1 text-sm text-gray-500">{book.author}</p>
            )}
          </div>

          <span
            className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${
              book.exchangeType.toLowerCase() === "donate"
                ? "bg-light-lilac"
                : "bg-dark-yellow"
            }`}
          >
            {book.exchangeType}
          </span>
        </div>

        {/* Status */}
        {statusLabel && (
          <div className="mt-3">
            <span className="rounded-full bg-dark-purple px-3 py-1 text-xs font-medium text-white">
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
