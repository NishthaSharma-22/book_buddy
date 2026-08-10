import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

import { connectDB } from "@/lib/mongodb";
import { Book } from "@/lib/models/Book";

type RouteContext = {
  params: Promise<{ id: string }>;
};


export async function PATCH(
  request: Request,
  { params }: RouteContext,
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: "You must be logged in." },
        { status: 401 },
      );
    }

    const { id } = await params;
    const body = await request.json();

    await connectDB();

    const book = await Book.findById(id);

    if (!book) {
      return NextResponse.json(
        { error: "Book not found." },
        { status: 404 },
      );
    }

    // Make sure only the owner can edit the book
    if (book.ownerId !== userId) {
      return NextResponse.json(
        { error: "You are not allowed to edit this book." },
        { status: 403 },
      );
    }

    // Only update fields that the user is allowed to edit
    const allowedFields = [
      "title",
      "author",
      "isbn",
      "subject",
      "grade",
      "edition",
      "condition",
      "description",
      "exchangeType",
      "institutionId",
      "imageUrl",
    ];

    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        book[field] = body[field];
      }
    }

    await book.save();

    return NextResponse.json({
      success: true,
      message: "Book updated successfully.",
      book,
    });
  } catch (error) {
    console.error("Error updating book:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Something went wrong while updating the book.",
      },
      { status: 500 },
    );
  }
}

// DELETE BOOK
export async function DELETE(
  request: Request,
  { params }: RouteContext,
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: "You must be logged in." },
        { status: 401 },
      );
    }

    const { id } = await params;

    await connectDB();

    const book = await Book.findById(id);

    if (!book) {
      return NextResponse.json(
        { error: "Book not found." },
        { status: 404 },
      );
    }

    // Make sure only the owner can delete the book
    if (book.ownerId !== userId) {
      return NextResponse.json(
        { error: "You are not allowed to delete this book." },
        { status: 403 },
      );
    }

    await Book.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "Book deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting book:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Something went wrong while deleting the book.",
      },
      { status: 500 },
    );
  }
}