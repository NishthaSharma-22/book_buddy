"use client";

import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { FaLandmark } from "react-icons/fa";

type BookBarProps = {
  onSearch: (query: string) => void;
  onCommunityChange?: (community: string) => void;
  onSubjectChange?: (subject: string) => void;
  onGradeChange?: (grade: string) => void;
  onExchangeTypeChange?: (exchangeType: string) => void;
};

const BookBar = ({
  onSearch,
  onCommunityChange,
  onSubjectChange,
  onGradeChange,
  onExchangeTypeChange,
}: BookBarProps) => {
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    onSearch(search);
  };

  return (
    // <div className="border rounded-xl border-gray-500 border-dashed bg-white p-4">
    <div>
      {/* Search */}
      <div className="relative">
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            onSearch(e.target.value);
          }}
          placeholder="Search by title, subject, author, ISBN..."
          className="w-full rounded-xl border-2 border-gray-500 bg-white px-5 py-3.5 pr-12 text-sm outline-none transition focus:border-gray-400"
        />

        <button
          type="button"
          onClick={handleSearch}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-2 hover:cursor-pointer"
          aria-label="Search"
        >
          <BiSearch size={20} />
        </button>
      </div>

      {/* Filters */}
      {/* <div className="mt-4 flex flex-wrap items-center gap-3"> */}
        {/* Community */}
        {/* <div className="relative">
          <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
            <FaLandmark size={14} />
          </div>

          <select
            onChange={(e) => onCommunityChange(e.target.value)}
            defaultValue=""
            className="appearance-none rounded-lg border border-gray-200 bg-white py-2.5 pl-9 pr-9 text-sm outline-none transition hover:cursor-pointer hover:bg-gray-50 focus:border-gray-400"
          >
            <option value="" disabled>
              My Community
            </option>

            <option value="my-community">
              My Community
            </option>

            <option value="all-communities">
              All Communities
            </option>

            <option value="college">
              College Communities
            </option>

            <option value="school">
              School Communities
            </option>
          </select>
        </div>
 */}
        {/* Subject */}
        {/* <select
          onChange={(e) => onSubjectChange(e.target.value)}
          defaultValue=""
          className="appearance-none rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none transition hover:cursor-pointer hover:bg-gray-50 focus:border-gray-400"
        >
          <option value="">All Subjects</option>

          <option value="mathematics">Mathematics</option>
          <option value="physics">Physics</option>
          <option value="chemistry">Chemistry</option>
          <option value="biology">Biology</option>
          <option value="computer-science">Computer Science</option>
          <option value="english">English</option>
        </select>

        <select
          onChange={(e) => onGradeChange(e.target.value)}
          defaultValue=""
          className="appearance-none rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none transition hover:cursor-pointer hover:bg-gray-50 focus:border-gray-400"
        >
          <option value="">All Classes / Years</option>

          <optgroup label="School">
            <option value="class-6">Class 6</option>
            <option value="class-7">Class 7</option>
            <option value="class-8">Class 8</option>
            <option value="class-9">Class 9</option>
            <option value="class-10">Class 10</option>
            <option value="class-11">Class 11</option>
            <option value="class-12">Class 12</option>
          </optgroup>

          <optgroup label="College">
            <option value="year-1">1st Year</option>
            <option value="year-2">2nd Year</option>
            <option value="year-3">3rd Year</option>
            <option value="year-4">4th Year</option>
          </optgroup>
        </select> */}
      {/* </div> */}

      {/* Exchange type tabs */}
      {/* <div className="mt-6 flex justify-center gap-6 border-b border-gray-200"> */}
        {/* <button
          type="button"
          onClick={() => onExchangeTypeChange("")}
          className="border-b-2 border-black px-1 pb-3 text-sm font-medium hover:cursor-pointer"
        >
          All Books
        </button>

        <button
          type="button"
          onClick={() => onExchangeTypeChange("donate")}
          className="px-1 pb-3 text-sm text-gray-500 hover:cursor-pointer hover:text-black"
        >
          Donate
        </button>

        <button
          type="button"
          onClick={() => onExchangeTypeChange("swap")}
          className="px-1 pb-3 text-sm text-gray-500 hover:cursor-pointer hover:text-black"
        >
          Swap
        </button>

        <button
          type="button"
          onClick={() => onExchangeTypeChange("sell")}
          className="px-1 pb-3 text-sm text-gray-500 hover:cursor-pointer hover:text-black"
        >
          Sell
        </button>

        <button
          type="button"
          onClick={() => onExchangeTypeChange("lend")}
          className="px-1 pb-3 text-sm text-gray-500 hover:cursor-pointer hover:text-black"
        >
          Lend
        </button> */}
      {/* </div> */}
    </div>
    
  );
};

export default BookBar;
