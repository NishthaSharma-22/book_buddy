import { ClerkProvider } from "@clerk/nextjs";
import { Header } from "../(landingPage)/Header";

type Props = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: Props) => {
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
