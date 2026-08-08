import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

import { connectDB } from "@/lib/mongodb";
import { Book } from "@/lib/models/Book";

export async function POST(request: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: "You must be logged in to add a book." },
        { status: 401 },
      );
    }

    const body = await request.json();

    await connectDB();

    const book = await Book.create({
      title: body.title,
      author: body.author,
      isbn: body.isbn,
      subject: body.subject,
      grade: body.grade,
      edition: body.edition,
      condition: body.condition,
      description: body.description,
      exchangeType: body.exchangeType,

      ownerId: userId,

      institutionId: body.institutionId || null,

      imageUrl: body.imageUrl || "",
    });

    return NextResponse.json(
      {
        success: true,
        message: "Book added successfully!",
        book,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating book:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Something went wrong while adding the book.",
      },
      { status: 500 },
    );
  }
}
