import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import { Conversation } from "@/lib/models/Conversation";

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const conversations = await Conversation.find({
      participants: userId,
    })
      .populate("bookId")
      .sort({ updatedAt: -1 })
      .lean();

    const client = await clerkClient();

    const conversationsWithUsers = await Promise.all(
      conversations.map(async (conversation) => {
const otherUserId = conversation.participants.find(
  (id: string) => id !== userId,
);
        let otherUser = null;

        if (otherUserId) {
          try {
            const user = await client.users.getUser(otherUserId);

            const name =
              `${user.firstName || ""} ${user.lastName || ""}`.trim() ||
              user.username ||
              "User";

            otherUser = {
              id: user.id,
              name,
            };
          } catch (error) {
            console.error(`Failed to fetch Clerk user ${otherUserId}:`, error);
          }
        }

        return {
          ...conversation,
          otherUser,
        };
      }),
    );

    return NextResponse.json(conversationsWithUsers);
  } catch (error) {
    console.error("Error fetching conversations:", error);

    return NextResponse.json(
      { error: "Failed to fetch conversations" },
      { status: 500 },
    );
  }
}
