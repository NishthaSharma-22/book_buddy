import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import { Book } from "@/lib/models/Book";
import { Conversation } from "@/lib/models/Conversation";
import { Notification } from "@/lib/models/Notification";

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

    // Create notification for the book owner
    const notification = await Notification.create({
      userId: book.ownerId,
      senderId: userId,
      type: "book_request",
      message: `Someone requested your book "${book.title}"`,
      conversationId: conversation._id,
      bookId: book._id,
    });

    (globalThis as any).io
      ?.to(`user:${book.ownerId}`)
      .emit("new-notification", notification);
    return NextResponse.json({
      conversationId: conversation._id.toString(),
    });
  } catch (error) {
    console.error("CREATE CONVERSATION ERROR:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unknown error creating conversation",
      },
      { status: 500 },
    );
  }
}
