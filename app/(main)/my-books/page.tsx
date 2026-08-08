import { auth } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/mongodb";
import { Book } from "@/lib/models/Book";
import MyBooks from "@/components/books/MyBooks";

export default async function MyBooksPage() {
  const { userId } = await auth();

  await connectDB();

  const books = await Book.find({
    ownerId: userId,
  })
    .sort({ createdAt: -1 })
    .lean();

  const serializedBooks = JSON.parse(JSON.stringify(books));

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="text-3xl font-bold">My Books</h1>

      <p className="mt-2 text-gray-500">
        Manage the books you've listed on Book Buddy.
      </p>

      <MyBooks books={serializedBooks} />
    </main>
  );
}
