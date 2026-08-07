import { ClerkProvider } from "@clerk/nextjs";

import { Header } from "./Header";

type Props = {
  children: React.ReactNode;
};
const LandingPage = ({ children }: Props) => {
  return (
    <div className="min-h-screen flex flex-col">
      <ClerkProvider>
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center">
          {children}
        </main>
      </ClerkProvider>
    </div>
  );
};

export default LandingPage;
