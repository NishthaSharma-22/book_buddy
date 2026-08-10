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
    <div>
      <div className="flex gap-1 w-full">
        <p>Total Books: </p>
        <p className="font-semibold">{totalBooks}</p>
      </div>
      <div className="flex gap-1">
        <p>Total Students: </p>
        <p className="font-semibold">{totalStudents}</p>
      </div>
    </div>
  );
}