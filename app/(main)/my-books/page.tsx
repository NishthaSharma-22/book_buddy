import { auth } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/mongodb";
import { Book } from "@/lib/models/Book";
import { BookCard } from "@/components/browse/BookCard";
import { redirect } from "next/navigation";

export default async function MyBooksPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  await connectDB();

  const books = await Book.find({ ownerId: userId })
    .sort({ createdAt: -1 })
    .lean();

  const serializedBooks = JSON.parse(JSON.stringify(books));

  const totalBooks = serializedBooks.length;

  const availableBooks = serializedBooks.filter(
    (book: any) => book.status === "available",
  ).length;

  const lentBooks = serializedBooks.filter(
    (book: any) => book.status === "lent",
  ).length;

  const archivedBooks = serializedBooks.filter(
    (book: any) => book.status === "archived",
  ).length;

  const swappedBooks = serializedBooks.filter(
    (book: any) => book.exchangeType === "swap" && book.status !== "available",
  ).length;

  const soldBooks = serializedBooks.filter(
    (book: any) => book.status === "sold",
  ).length;

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold">My Books</h1>

        <p className="mt-2 text-gray-500">
          Keep track of the books you have shared.
        </p>
      </div>

      {/* Stats */}
      {totalBooks > 0 && (
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          <div className="rounded-xl border border-gray-200 bg-white p-4">
            <p className="text-sm text-gray-500">Total</p>
            <p className="mt-1 text-2xl font-bold">{totalBooks}</p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-4">
            <p className="text-sm text-gray-500">Available</p>
            <p className="mt-1 text-2xl font-bold">{availableBooks}</p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-4">
            <p className="text-sm text-gray-500">Lent</p>
            <p className="mt-1 text-2xl font-bold">{lentBooks}</p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-4">
            <p className="text-sm text-gray-500">Swapped</p>
            <p className="mt-1 text-2xl font-bold">{swappedBooks}</p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-4">
            <p className="text-sm text-gray-500">Sold</p>
            <p className="mt-1 text-2xl font-bold">{soldBooks}</p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-4">
            <p className="text-sm text-gray-500">Archived</p>
            <p className="mt-1 text-2xl font-bold">{archivedBooks}</p>
          </div>
        </div>
      )}

      {/* No books */}
      {serializedBooks.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-gray-300 p-12 text-center">
          <p className="text-gray-500">
            You haven't uploaded any books yet.
          </p>

          <a
            href="/books/add"
            className="mt-4 inline-block rounded-xl bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
          >
            Add a book
          </a>
        </div>
      ) : (
        <>
          <p className="mt-8 text-lg text-gray-900">
            You have uploaded{" "}
            <span className="font-semibold">{totalBooks}</span>{" "}
            {totalBooks === 1 ? "book" : "books"}
          </p>

          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {serializedBooks.map((book: any) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
        </>
      )}
    </main>
  );
}
