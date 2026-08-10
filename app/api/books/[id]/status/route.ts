import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import { Book } from "@/lib/models/Book";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const { status } = await req.json();

    const allowedStatuses = [
      "available",
      "given-away",
      "sold",
      "lent",
      "archived",
    ];

    if (!allowedStatuses.includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    await connectDB();

    const book = await Book.findById(id);

    if (!book) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 });
    }

    if (book.ownerId !== userId) {
      return NextResponse.json(
        { error: "You can only update your own books" },
        { status: 403 },
      );
    }

    book.status = status;
    await book.save();

    return NextResponse.json({
      success: true,
      book,
    });
  } catch (error) {
    console.error("UPDATE BOOK STATUS ERROR:", error);

    return NextResponse.json(
      { error: "Failed to update book status" },
      { status: 500 },
    );
  }
}
