import { clerkClient } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/mongodb";
import { Book } from "@/lib/models/Book";

export async function getTotalBooks() {
  await connectDB();
  return await Book.countDocuments();
}

export async function getTotalStudents() {
  return await (await clerkClient()).users.getCount();
}
