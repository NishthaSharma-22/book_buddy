import { connectDB } from "@/lib/mongodb";
import { Book } from "@/lib/models/Book";
import { BrowseBooks } from "./BrowseBooks";

async function getBooks() {
  await connectDB();

  const books = await Book.aggregate([
    {
      $addFields: {
        statusOrder: {
          $switch: {
            branches: [
              {
                case: { $eq: ["$status", "available"] },
                then: 0,
              },
            ],
            default: 1,
          },
        },
      },
    },
    {
      $sort: {
        statusOrder: 1,
        createdAt: -1,
      },
    },
    {
      $project: {
        statusOrder: 0,
      },
    },
  ]);

  return JSON.parse(JSON.stringify(books));
}

export default async function BrowsePage() {
  const books = await getBooks();

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <div>
        <h1 className="text-3xl font-semibold">browse books</h1>

        <p className="mt-2 mb-5 text-gray-500">
          find books from students in your community
        </p>
      </div>
      <BrowseBooks books={books} />
    </main>
  );
}
