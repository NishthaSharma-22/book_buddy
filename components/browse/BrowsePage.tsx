import { connectDB } from "@/lib/mongodb";
import { Book } from "@/lib/models/Book";
import { BrowseBooks } from "./BrowseBooks";
import Stats from "../stats/Stats";
import { getTotalBooks, getTotalStudents } from "@/lib/stats";

const LIMIT = 12;

async function getBooks() {
  await connectDB();

  const books = await Book.aggregate([
    {
      $addFields: {
        statusOrder: {
          $switch: {
            branches: [{ case: { $eq: ["$status", "available"] }, then: 0 }],
            default: 1,
          },
        },
      },
    },
    { $sort: { statusOrder: 1, createdAt: -1 } },
    { $limit: LIMIT + 1 },
    { $project: { statusOrder: 0 } },
  ]);

  const hasMore = books.length > LIMIT;
  if (hasMore) books.pop();

  return { books: JSON.parse(JSON.stringify(books)), hasMore };
}

export default async function BrowsePage() {
  const { books, hasMore } = await getBooks();
  const totalBooks = await getTotalBooks();
  const totalStudents = await getTotalStudents();

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <div>
        <h1 className="text-3xl font-semibold">
          browse from {totalBooks}+ books
        </h1>
        <p className="mt-2 mb-5 text-gray-500">
          find books from{" "}
          <span className="font-bold text-xl text-black">
            {totalStudents} students
          </span>{" "}
          in your community
        </p>
      </div>
      <BrowseBooks initialBooks={books} initialHasMore={hasMore} />
    </main>
  );
}
