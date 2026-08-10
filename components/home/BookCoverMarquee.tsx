"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { Marquee } from "../ui/marquee";

type Book = {
  _id: string;
  title: string;
  imageUrl: string;
};

type BookCoverMarqueeProps = {
  books: Book[];
};

function BookCover({ book }: { book: Book }) {
  return (
    <div
      className="relative h-52 w-36 shrink-0 overflow-hidden rounded-xl border-2 border-black bg-gray-100 shadow-lg sm:h-60 sm:w-40"
      style={{
        transform: "translateZ(0)",
      }}
    >
      <Image
        src={book.imageUrl}
        alt={book.title}
        fill
        sizes="160px"
        className="object-cover"
      />
    </div>
  );
}

export default function BookCoverMarquee({ books }: BookCoverMarqueeProps) {
  if (books.length === 0) {
    return null;
  }

  const repeatedBooks = [...books, ...books];

  return (
    <div className="relative w-full overflow-hidden py-8">
      {/* 3D perspective container */}
      <div
        style={{
          perspective: "1200px",
        }}
      >
        {/* Row 1 */}
        <div
          style={{
            transform: "translateZ(0) rotateY(-6deg)",
            transformStyle: "preserve-3d",
          }}
        >
          <Marquee pauseOnHover className="[--duration:14s] [--gap:1rem]">
            {repeatedBooks.map((book, index) => (
              <BookCover key={`row1-${book._id}-${index}`} book={book} />
            ))}
          </Marquee>
        </div>

        {/* Row 2 */}
        <div
          className="mt-4"
          style={{
            transform: "translateZ(-80px) rotateY(6deg)",
            transformStyle: "preserve-3d",
          }}
        >
          <Marquee
            reverse
            pauseOnHover
            className="[--duration:16s] [--gap:1rem]"
          >
            {repeatedBooks.map((book, index) => (
              <BookCover key={`row2-${book._id}-${index}`} book={book} />
            ))}
          </Marquee>
        </div>

        {/* Row 3 */}
        <div
          className="mt-4"
          style={{
            transform: "translateZ(-160px) rotateY(-6deg)",
            transformStyle: "preserve-3d",
          }}
        >
          <Marquee pauseOnHover className="[--duration:18s] [--gap:1rem]">
            {repeatedBooks.map((book, index) => (
              <BookCover key={`row3-${book._id}-${index}`} book={book} />
            ))}
          </Marquee>
        </div>
      </div>
    </div>
  );
}