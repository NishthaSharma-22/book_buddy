import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import { Notification } from "@/lib/models/Notification";

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const notifications = await Notification.find({
      userId,
    })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(notifications);
  } catch (error) {
    console.error("Error fetching notifications:", error);

    return NextResponse.json(
      { error: "Failed to fetch notifications" },
      { status: 500 },
    );
  }
}
