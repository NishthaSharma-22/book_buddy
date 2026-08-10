import { Book } from "@/lib/models/Book";
import { connectDB } from "@/lib/mongodb";
import { getPastelColor } from "@/lib/utils";
import Image from "next/image";
import { notFound } from "next/navigation";
import BackToBrowse from "@/components/browse/BackToBrowse";
import RequestBookButton from "@/components/books/RequestBookButton";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function IndividualBookPage({ params }: Props) {
  const { id } = await params;
  await connectDB();

  const book = await Book.findById(id).lean();
  if (!Book) {
    notFound();
  }
  const handleRequestBook = async () => {
    try {
      const response = await fetch("/api/conversations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bookId: book._id,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to request book");
      }

      window.location.href = `/books/messages/${data.conversationId}`;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
        <BackToBrowse />
      <div className="grid gap-8 md:grid-cols-2">
        <div
          className={`flex min-h-[450px] items-center justify-center rounded-2xl ${getPastelColor(book._id.toString())}`}
        >
          {book.imageUrl ? (
            <Image
              src={book.imageUrl}
              alt={book.title}
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="text-8xl">📚</span>
          )}
        </div>
        <div className="flex flex-col justify-center">
          <div>
            <span className="bg-white px-3 py-1 text-sm font-medium">
              {book.exchangeType}
            </span>
            <h1 className="mt-4 text-4xl font-bold">{book.title}</h1>
            {book.author && (
              <p className="mt-2 text-lg text-gray-700">{book.author}</p>
            )}
          </div>
          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="bg-white p-4">
              <p className="text-xs text-gray-500">Subject</p>
              <p className="mt-1 font-medium">{book.subject}</p>
            </div>
            <div className="bg-white p-4">
              <p className="text-xs text-gray-500">Class / Year</p>
              <p className="mt-1 font-medium">{book.grade}</p>
            </div>
            <div className="bg-white p-4">
              <p className="text-xs text-gray-500">Condition</p>
              <p className="mt-1 font-medium">{book.condition}</p>
            </div>
            {book.edition && (
              <div className="bg-white p-4">
                <p className="text-xs text-gray-500">Edition</p>
                <p className="mt-1 font-medium"> {book.edition} </p>
              </div>
            )}
          </div>
          {book.description && (
            <div className="mt-8">
              <h2 className="font-semibold">About this book</h2>
              <p className="mt-2 leading-7 text-gray-600">{book.description}</p>
            </div>
          )}
          <RequestBookButton bookId={book._id.toString()} />
        </div>
      </div>
    </main>
  );
}
