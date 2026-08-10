import { clerkClient } from "@clerk/nextjs/server";

import { connectDB } from "@/lib/mongodb";
import { Book } from "@/lib/models/Book";

export default async function Stats() {
  await connectDB();

  const [totalBooks, totalStudents] = await Promise.all([
    Book.countDocuments(),
    (await clerkClient()).users.getCount(),
  ]);

  return (
    <div className="flex items-center gap-5 text-4xl mt-5">
      <h2 className="flex items-center gap-2 p-2">
        <p className="font-semibold text-5xl">{totalBooks}</p>
        <p className="text-gray-500">Books</p>
      </h2>

      <div className="flex items-center gap-2 p-2">
        <p className="font-semibold text-5xl">{totalStudents}</p>
        <p className="text-gray-500">Active Students</p>
      </div>
    </div>
  );
}