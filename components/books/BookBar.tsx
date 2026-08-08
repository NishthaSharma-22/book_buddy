import { BiSearch } from "react-icons/bi";
import { FaLandmark } from "react-icons/fa";

const BookBar = () => {
  return (
    <div className="w-full">
      {/* Search */}
      <div className="relative">
        <input
          type="text"
          placeholder="search by title, subject, author, ISBN..."
          className="w-full rounded-xl border border-gray-20 px-5 py-3.5 pr-12 text-sm outline-none transition focus:border-gray-400"
        />

        <button
          className="absolute right-3 top-1/2 -translate-y-1/2 p-2 hover:cursor-pointer"
          aria-label="Search"
        >
          <BiSearch size={20} />
        </button>
      </div>

      {/* Filters */}
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm hover:bg-gray-50">
          <div className="flex items-center justofy-center gap-3">
            <FaLandmark />
            <p>my community</p>
          </div>
        </button>

        <button className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm hover:bg-gray-50">
          <div className="flex items-center justofy-center gap-3">
            <FaLandmark />
            <p>near me</p>
          </div>
        </button>

        <button className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm hover:bg-gray-50">
          <div className="flex items-center justofy-center gap-3">
            <FaLandmark />
            <p>subject</p>
          </div>
        </button>

        <button className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm hover:bg-gray-50">
          <div className="flex items-center justofy-center gap-3">
            <FaLandmark />
            <p>class</p>
          </div>
        </button>
      </div>

      {/* Exchange type tabs */}
      <div className="mt-6 flex justify-center gap-6 border-b border-gray-200">
        <button className="border-b-2 border-black px-1 pb-3 text-sm font-medium hover:cursor-pointer">
          all books
        </button>

        <button className="px-1 pb-3 text-sm text-gray-500 hover:text-black hover:cursor-pointer">
          donate
        </button>

        <button className="px-1 pb-3 text-sm text-gray-500 hover:text-black hover:cursor-pointer">
          swap
        </button>

        <button className="px-1 pb-3 text-sm text-gray-500 hover:text-black hover:cursor-pointer">
          sell
        </button>

        <button className="px-1 pb-3 text-sm text-gray-500 hover:text-black hover:cursor-pointer">
          lend
        </button>
      </div>
    </div>
  );
};

export default BookBar;
