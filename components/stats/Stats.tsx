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
    <div className="grid grid-cols-2 mt-5 sm:text-4xl md:text-5xl lg:text-6xl">
      <h2 className="grid p-2">
        <p className="font-semibold">{totalBooks}</p>
        <p className="text-gray-500">Books</p>
      </h2>

      <div className="grid p-2">
        <p className="font-semibold">{totalStudents}</p>
        <p className="text-gray-500">Active Students</p>
      </div>
    </div>
  );
}