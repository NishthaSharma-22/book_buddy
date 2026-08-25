import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { AddBookForm } from "@/components/books/AddBookForm";

const page = async () => {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  return (
    <div>
      <AddBookForm />
    </div>
  );
};

export default page;
