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

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
    const limit = 12;
    const search = searchParams.get("search") || "";
    const subject = searchParams.get("subject") || "";
    const grade = searchParams.get("grade") || "";

    await connectDB();

    const matchStage: Record<string, unknown> = {};

    if (search) {
      matchStage.$or = [
        { title: { $regex: search, $options: "i" } },
        { author: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { subject: { $regex: search, $options: "i" } },
      ];
    }
    if (subject) matchStage.subject = subject;
    if (grade) matchStage.grade = grade;

    const books = await Book.aggregate([
      { $match: matchStage },
      {
        $addFields: {
          statusOrder: {
            $switch: {
              branches: [{ case: { $eq: ["$status", "available"] }, then: 0 }],
              default: 1,
            },
          },
        },
      },
      { $sort: { statusOrder: 1, createdAt: -1 } },
      { $skip: (page - 1) * limit },
      { $limit: limit + 1 },
      { $project: { statusOrder: 0 } },
    ]);

    const hasMore = books.length > limit;
    if (hasMore) books.pop();

    return NextResponse.json({
      books: JSON.parse(JSON.stringify(books)),
      hasMore,
    });
  } catch (error) {
    console.error("Error fetching books:", error);
    return NextResponse.json(
      { error: "Failed to fetch books" },
      { status: 500 },
    );
  }
}