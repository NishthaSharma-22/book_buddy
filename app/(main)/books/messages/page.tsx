import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import MessagesPage from "@/components/messages/MessagesPage";

export default async function Messages() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-6">
      <MessagesPage currentUserId={userId} />
    </main>
  );
}
