import { auth } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";

import { connectDB } from "@/lib/mongodb";
import { Book } from "@/lib/models/Book";
import EditBookForm from "@/components/edit/EditBookPage";


type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditBookPage({
  params,
}: Props) {
  const { id } = await params;

  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  await connectDB();

  const book = await Book.findById(id).lean();

  if (!book) {
    notFound();
  }

  // Only the owner can access the edit page
  if (book.ownerId !== userId) {
    redirect(`/books/${id}`);
  }

  const serializedBook = JSON.parse(
    JSON.stringify(book),
  );

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <EditBookForm book={serializedBook} />
    </main>
  );
}
