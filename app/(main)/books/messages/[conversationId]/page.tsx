import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import ChatWindow from "@/components/chat/ChatWindow";

type PageProps = {
  params: Promise<{ conversationId: string }>;
};

export default async function ConversationPage({ params }: PageProps) {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const { conversationId } = await params;

  return <ChatWindow conversationId={conversationId} currentUserId={userId} />;
}
