import { BookCard } from "@/components/browse/BookCard";

type Book = {
  _id: string;
  title: string;
  author?: string;
  subject: string;
  grade: string;
  condition: string;
  description: string;
  exchangeType: string;
  imageUrl?: string;
  status?: string;
  createdAt: string;
};

export default function SimilarBooks({ books }: { books: Book[] }) {
  return (
    <section className="mt-16">
      <h2 className="text-xl font-semibold">You might also like</h2>
      <p className="mt-1 text-sm text-gray-500">
        More books in the same subject and class
      </p>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {books.map((book) => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>
    </section>
  );
}
