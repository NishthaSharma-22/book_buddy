import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export const Header = () => {
  return (
    <header className="w-full px-4 sm:px-6">
      <div className="max-w-6xl mx-auto mt-5 flex h-16 items-center justify-between rounded-xl border border-b-8 bg-white px-4 sm:px-6">
        {/* TODO: MAKE A LOGO AND ADD IT HERE PLS */}
        <h1 className="text-lg font-bold">book_buddy</h1>

        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="hover:underline decoration-wavy">
            browse
          </Link>
          <Link href="/" className="hover:underline decoration-wavy">
            how it works
          </Link>
          <div className="flex items-center gap-3">
            <Show when="signed-out">
              <SignUpButton>
                <button className="rounded-full bg-[#d6d0ff] px-4 py-2 text-sm font-medium hover:opacity-90">
                  get started
                </button>
              </SignUpButton>
            </Show>

            <Show when="signed-in">
              <UserButton />
            </Show>
          </div>
        </nav>
      </div>
    </header>
  );
};
