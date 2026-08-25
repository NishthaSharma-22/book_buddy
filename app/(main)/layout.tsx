import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ClerkProvider } from "@clerk/nextjs";
import { Header } from "../(landingPage)/Header";

type Props = {
  children: React.ReactNode;
};

const MainLayout = async ({ children }: Props) => {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  return (
    <ClerkProvider>
      <div className="min-h-screen">
        <Header />
        <main className="flex min-h-[calc(100vh-64px)] flex-col items-center">
          {children}
        </main>
      </div>
    </ClerkProvider>
  );
};

export default MainLayout;
