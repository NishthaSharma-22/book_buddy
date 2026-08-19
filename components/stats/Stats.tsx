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
    <div className="mt-6 flex w-fit items-center justify-center gap-8 sm:gap-10 md:gap-12 sm:mx-auto">
      <div className="grid p-2 text-center lg:text-left">
        <p className="text-3xl font-semibold sm:text-3xl md:text-5xl">
          {totalBooks}+
        </p>
        <p className="text-base text-gray-500 sm:text-lg md:text-xl">Books</p>
      </div>

      <div className="grid p-2 text-center lg:text-left">
        <p className="text-3xl font-semibold sm:text-3xl md:text-5xl">
          {totalStudents}
        </p>
        <p className="text-base text-gray-500 sm:text-lg md:text-xl">
          Students
        </p>
      </div>
    </div>
  );
}