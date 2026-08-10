import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import MessagesPage from "@/components/messages/MessagesPage";

type PageProps = {
  params: Promise<{
    conversationId: string;
  }>;
};

export default async function ConversationPage({ params }: PageProps) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const { conversationId } = await params;

  return (
    <main className="mx-auto max-w-7xl px-4 py-6">
      <MessagesPage currentUserId={userId} conversationId={conversationId} />
    </main>
  );
}
