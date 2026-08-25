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

      const otherUserIds = [
        ...new Set(
          conversations
            .map((c) => c.participants.find((id: string) => id !== userId))
            .filter(Boolean) as string[],
        ),
      ];

      const { data: users } =
        otherUserIds.length > 0
          ? await client.users.getUserList({ userId: otherUserIds, limit: 100 })
          : { data: [] };

      const userMap = new Map(
        users.map((user) => {
          const name =
            `${user.firstName || ""} ${user.lastName || ""}`.trim() ||
            user.username ||
            "User";
          return [user.id, { id: user.id, name }];
        }),
      );

      const conversationsWithUsers = conversations.map((conversation) => {
        const otherUserId = conversation.participants.find(
          (id: string) => id !== userId,
        );
        const otherUser = otherUserId
          ? (userMap.get(otherUserId) ?? { id: otherUserId, name: "User" })
          : null;

        return { ...conversation, otherUser };
      });

      return NextResponse.json(conversationsWithUsers);
    
  } catch (error) {
    console.error("ERROR IN /api/conversations/user:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch conversations",
      },
      { status: 500 },
    );
  }
}
