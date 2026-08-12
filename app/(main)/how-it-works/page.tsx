import React from "react";

const HowItWorks = () => {
  return (
    <div className=" flex items-center justify-center w-[90%] lg:w-[60%] mt-20">
      <video autoPlay muted loop playsInline className="w-full rounded-sm">
        <source src="/videos/book_buddy.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default HowItWorks;
