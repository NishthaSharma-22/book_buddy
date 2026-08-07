import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { Hero } from "./Hero";

export default async function Home() {
  const { userId } = await auth();

  if (userId) {
    redirect("/books");
  }

  return (
    <div>
      <Hero />
    </div>
  );
}
