import BookCoverMarquee from "@/components/home/BookCoverMarquee";
import Stats from "@/components/stats/Stats";
import { SignUpButton } from "@clerk/nextjs";

type HeroBook = {
  _id: string;
  title: string;
  imageUrl: string;
};

type HeroProps = {
  books: HeroBook[];
};

export const Hero = ({ books }: HeroProps) => {
  return (
    <section className="overflow-hidden py-10 md:py-20">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-16 px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="flex w-full max-w-xl flex-col gap-5 text-center lg:w-[40%] lg:text-left">
          <div>
            <h1 className="text-light-lilac [-webkit-text-stroke:2px_var(--color-gray-600)] font-black  text-4xl sm:text-4xl md:text-5xl lg:text-7xl">
              book_buddy
            </h1>
            <div className="flex flex-col gap-3">
              <p className="sm:text-3xl md:text-4xl lg:text-5xl">
                share and get
              </p>
              <span className="bg-light-yellow mx-auto w-fit h-full p-1 rounded-xl -rotate-3 lg:mx-0 border-dashed border-black border-2 sm:text-3xl md:text-4xl lg:text-5xl">
                books
              </span>
              <p className="sm:text-3xl md:text-4xl lg:text-5xl">with ease</p>
            </div>
          </div>
          <div className="mt-6 sm:mx-auto md:mx-auto">
            <Stats />
          </div>
          <div className="sm:mx-auto">
            <SignUpButton>
              <button className="w-fit rounded-xl text-xl border-b-5  border-black bg-dark-lilac text-white py-2 px-2 font-medium md:mt-4 lg:mt-4 sm:mt-2 hover:bg-light-yellow hover:text-black">
                Sign up to get started
              </button>
            </SignUpButton>
          </div>
        </div>
        <div className="w-full lg:w-[60%]">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full rounded-sm select-none"
          >
            <source src="/videos/book_buddy.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </section>
  );
};
