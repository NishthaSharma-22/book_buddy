"use client";

import { useRouter } from "next/navigation";
import { BiLeftArrow, BiLeftArrowAlt, BiLeftArrowCircle } from "react-icons/bi";

export default function BackToBrowse(){
    const router =  useRouter();
    return (
      <div className="flex items-center gap-2 my-4">
        <button
          type="button"
          onClick={() => router.back()}
          className=" bg-white rounded-full border-2 border-black p-1"
        >
          <BiLeftArrowAlt size={25} />
        </button>
        <p className="font-semibold">Back</p>
      </div>
    );
}