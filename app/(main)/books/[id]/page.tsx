import { auth } from "@clerk/nextjs/server";
import { Book } from "@/lib/models/Book";
import { connectDB } from "@/lib/mongodb";
import { getPastelColor } from "@/lib/utils";
import Image from "next/image";
import { notFound } from "next/navigation";

import BackToBrowse from "@/components/browse/BackToBrowse";
import RequestBookButton from "@/components/books/RequestBookButton";
import BookStatusControl from "@/components/books/BookStatusControl";
import BookOwnerControls from "@/components/edit/BookOwnerControls";
import SimilarBooks from "@/components/books/SimilarBooks";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function IndividualBookPage({ params }: Props) {
  const { id } = await params;
  const book = await Book.findById(id).lean();

  await connectDB();

  const { userId } = await auth();

  let hasUploadedBook = false;
  if (userId && userId !== book?.ownerId) {
    const uploadedCount = await Book.countDocuments({ ownerId: userId });
    hasUploadedBook = uploadedCount > 0;
  }


  const similarBooks = await Book.find({
    _id: { $ne: book._id },
    subject: book.subject,
    grade: book.grade,
    status: "unavailable",
  })
    .limit(4)
    .select(
      "_id title author imageUrl subject grade condition exchangeType status createdAt",
    )
    .lean();

  const serializedSimilar = JSON.parse(JSON.stringify(similarBooks));

  if (!book) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <BackToBrowse />

      <div className="mt-6 grid gap-8 md:grid-cols-2">
        {/* Book image */}
        <div
          className={`flex min-h-112.5 items-center justify-center rounded-2xl ${
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
              className="min-h-112.5 w-auto rounded-xl object-contain"
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
            <>
              <BookStatusControl
                bookId={book._id.toString()}
                currentStatus={book.status}
              />

              <BookOwnerControls bookId={book._id.toString()} />
            </>
          )}

          {/* Request button */}
          {userId !== book.ownerId && (
            <div className="mt-8">
              <RequestBookButton
                bookId={book._id.toString()}
                status={book.status}
                hasUploadedBook={hasUploadedBook}
              />
            </div>
          )}
        </div>
      </div>
      {serializedSimilar.length > 0 && (
        <SimilarBooks books={serializedSimilar} />
      )}
    </main>
  );
}
