import { capitalize, getPastelColor } from "@/lib/utils";

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

type BookCardProps = {
  book: Book;
};

export function BookCard({ book }: BookCardProps) {
  return (
    <div className="overflow-hidden border-dashed border-black border-2 bg-white transition hover:-translate-y-1 hover:cursor-pointer">
      <div className="flex h-56 items-center justify-center bg-gray-100">
        {book.imageUrl ? (
          <img
            src={book.imageUrl}
            alt={book.title}
            className="h-56 w-full object-cover"
          />
        ) : (
          <div
            className={`flex h-56 w-full items-center justify-center ${getPastelColor(
              book._id,
            )}`}
          >
            <span className="text-5xl">📚</span>
          </div>
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

          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium capitalize">
            {book.exchangeType}
          </span>
        </div>

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
          <p className="mt-3 text-xs text-gray-500">Edition: {book.edition}</p>
        )}
      </div>
    </div>
  );
}
