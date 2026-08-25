import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import ConversationList from "@/components/messages/ConversationList";

export default async function MessagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  return (
    <div className="flex h-[calc(100vh-64px)] w-full overflow-hidden">
      <div className="h-full w-80 min-w-80 shrink-0 border-r border-gray-200">
        <ConversationList currentUserId={userId} />
      </div>
      <div className="h-full min-w-0 flex-1 overflow-hidden">{children}</div>
    </div>
  );
}
