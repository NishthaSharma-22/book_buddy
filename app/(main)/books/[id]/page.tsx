import { auth } from "@clerk/nextjs/server";
import { Book } from "@/lib/models/Book";
import { connectDB } from "@/lib/mongodb";
import { getPastelColor } from "@/lib/utils";
import Image from "next/image";
import { notFound } from "next/navigation";

import BackToBrowse from "@/components/browse/BackToBrowse";
import RequestBookButton from "@/components/books/RequestBookButton";
import BookStatusControl from "@/components/books/BookStatusControl";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function IndividualBookPage({
  params,
}: Props) {
  const { id } = await params;

  await connectDB();

  const { userId } = await auth();

  const book = await Book.findById(id).lean();

  if (!book) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <BackToBrowse />

      <div className="mt-6 grid gap-8 md:grid-cols-2">
        {/* Book image */}
        <div
          className={`flex min-h-[450px] items-center justify-center rounded-2xl ${
            !book.imageUrl
              ? getPastelColor(book._id.toString())
              : "bg-transparent"
          }`}
        >
          {book.imageUrl ? (
            <Image
              src={book.imageUrl}
              alt={book.title}
              width={400}
              height={500}
              className="max-h-[450px] w-auto rounded-xl object-contain"
            />
          ) : (
            <span className="text-7xl">📚</span>
          )}
        </div>

        {/* Book information */}
        <div className="flex flex-col">
          <p className="text-sm font-medium uppercase tracking-wide text-gray-500">
            {book.exchangeType}
          </p>

          <h1 className="mt-2 text-4xl font-bold">{book.title}</h1>

          {book.author && (
            <p className="mt-2 text-lg text-gray-600">{book.author}</p>
          )}

          <div className="mt-8 grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500">Subject</p>
              <p className="mt-1 font-medium">{book.subject}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Class / Year</p>
              <p className="mt-1 font-medium">{book.grade}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Condition</p>
              <p className="mt-1 font-medium capitalize">{book.condition}</p>
            </div>

            {book.edition && (
              <div>
                <p className="text-sm text-gray-500">Edition</p>
                <p className="mt-1 font-medium">{book.edition}</p>
              </div>
            )}
          </div>

          {book.description && (
            <div className="mt-8">
              <p className="text-sm text-gray-500">About this book</p>

              <p className="mt-2 leading-relaxed text-gray-700">
                {book.description}
              </p>
            </div>
          )}

          {/* Owner controls */}
          {userId === book.ownerId && (
            <BookStatusControl
              bookId={book._id.toString()}
              currentStatus={book.status}
            />
          )}

          {/* Request button */}
          {userId !== book.ownerId && (
            <div className="mt-8">
              <RequestBookButton
                bookId={book._id.toString()}
                status={book.status}
              />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
