import { connectDB } from "@/lib/mongodb";
import { Book } from "@/lib/models/Book";
import { BrowseBooks } from "./BrowseBooks";

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
      <BrowseBooks books={books} />
    </main>
  );
}
