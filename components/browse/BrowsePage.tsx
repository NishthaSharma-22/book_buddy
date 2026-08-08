import { connectDB } from "@/lib/mongodb";
import { Book } from "@/lib/models/Book";
import { BookCard } from "./BookCard";

async function getBooks() {
  await connectDB();

  const books = await Book.find().sort({ createdAt: -1 }).lean();

  return JSON.parse(JSON.stringify(books));
}

export default async function BrowsePage() {
  const books = await getBooks();

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <div>
        <h1 className="text-3xl font-semibold">Browse Books</h1>

        <p className="mt-2 text-gray-500">
          Find books from students in your community.
        </p>
      </div>

      {books.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-gray-300 p-12 text-center">
          <p className="text-gray-500">No books have been listed yet.</p>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {books.map((book: any) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      )}
    </main>
  );
}
