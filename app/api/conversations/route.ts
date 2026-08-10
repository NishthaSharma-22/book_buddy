import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import { Book } from "@/lib/models/Book";
import { Conversation } from "@/lib/models/Conversation";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { bookId } = await req.json();

    if (!bookId) {
      return NextResponse.json(
        { error: "Book ID is required" },
        { status: 400 },
      );
    }

    await connectDB();

    const book = await Book.findById(bookId);

    if (!book) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 });
    }

    if (book.ownerId === userId) {
      return NextResponse.json(
        { error: "You cannot request your own book" },
        { status: 400 },
      );
    }

    const participants = [userId, book.ownerId].sort();

    let conversation = await Conversation.findOne({
      bookId,
      participants: {
        $all: participants,
      },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants,
        bookId,
      });
    }

    return NextResponse.json({
      conversationId: conversation._id.toString(),
    });
  } catch (error) {
    console.error("Error creating conversation:", error);

    return NextResponse.json(
      { error: "Failed to create conversation" },
      { status: 500 },
    );
  }
}
