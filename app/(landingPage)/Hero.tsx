export const Hero = () => {
  return (
    <section className="overflow-hidden py-10 md:py-20">
      <div className="mx-auto flex w-full max-w-7xl flex-col-reverse items-center justify-between gap-12 px-6 lg:flex-row lg:px-8">
        <div className="flex flex-col gap-5 text-center lg:text-left">
          <h1 className="text-light-lilac [-webkit-text-stroke:2px_theme(colors.gray.600)] font-black  text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
            book_buddy
          </h1>
          <div className="flex flex-col gap-3 text-5xl sm:text-4xl md:text-5xl">
            <p>share and get</p>
            <span className="bg-light-yellow mx-auto w-fit h-full p-1 rounded-xl -rotate-3 lg:mx-0 border-dashed border-black border-2">
              books
            </span>
            <p>with ease</p>
          </div>
        </div>
        <div>
            {/* TODO: ADD A VIDEO SHOWING ALL THE BOOKS HERE LATER OKHAY */}
            
        </div>
      </div>
    </section>
  );
};
