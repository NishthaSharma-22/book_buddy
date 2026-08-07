import { Header } from "./Header";

type Props = {
  children: React.ReactNode;
};
const LandingPage = ({ children }: Props) => {
  return (
    <div className="min-h-screen flex flex-col">
        <Header />
        <main>{children}</main>
    </div>
  );
};

export default LandingPage;
