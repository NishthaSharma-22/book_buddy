import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { connectDB } from "@/lib/mongodb";
import { Book } from "@/lib/models/Book";

import { Hero } from "./Hero";

export default async function Home() {
  const { userId } = await auth();

  if (userId) {
    redirect("/books");
  }

  await connectDB();

  const books = await Book.find({
    imageUrl: { $exists: true, $ne: "" },
    status: "available",
  })
    .sort({ createdAt: -1 })
    .limit(12)
    .select("_id title imageUrl")
    .lean();

  return (
    <div>
      <Hero books={JSON.parse(JSON.stringify(books))} />
    </div>
  );
}
