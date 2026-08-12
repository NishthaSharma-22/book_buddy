"use client";

import { useState } from "react";
import { BiSearch, BiFilterAlt, BiX } from "react-icons/bi";

type BookBarProps = {
  onSearch: (query: string) => void;
  onSubjectChange?: (subject: string) => void;
  onGradeChange?: (grade: string) => void;
  onConditionChange?: (condition: string) => void;
  onExchangeTypeChange?: (exchangeType: string) => void;
};

const BookBar = ({
  onSearch,
  onSubjectChange,
  onGradeChange,
  onConditionChange,
  onExchangeTypeChange,
}: BookBarProps) => {
  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const [subject, setSubject] = useState("");
  const [grade, setGrade] = useState("");
  const [condition, setCondition] = useState("");
  const [exchangeType, setExchangeType] = useState("");

  const handleSubjectChange = (value: string) => {
    setSubject(value);
    onSubjectChange?.(value);
  };

  const handleGradeChange = (value: string) => {
    setGrade(value);
    onGradeChange?.(value);
  };

  const handleConditionChange = (value: string) => {
    setCondition(value);
    onConditionChange?.(value);
  };

  const handleExchangeTypeChange = (value: string) => {
    setExchangeType(value);
    onExchangeTypeChange?.(value);
  };

  const clearFilters = () => {
    setSubject("");
    setGrade("");
    setCondition("");
    setExchangeType("");

    onSubjectChange?.("");
    onGradeChange?.("");
    onConditionChange?.("");
    onExchangeTypeChange?.("");
  };

  const activeFilterCount = [subject, grade, condition, exchangeType].filter(
    Boolean,
  ).length;

  return (
    <div className="w-full">
      {/* Search + Filter button */}
      <div className="flex gap-3">
        <div className="relative flex-1">
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

          <BiSearch
            size={20}
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2"
          />
        </div>

        {/* Filter button */}
        <button
          type="button"
          onClick={() => setShowFilters((prev) => !prev)}
          className="relative flex items-center gap-2 rounded-xl border-2 border-gray-500 bg-white px-4 py-3 text-sm font-medium transition hover:bg-gray-50"
        >
          <BiFilterAlt size={20} />

          <span className="hidden sm:inline">Filters</span>

          {activeFilterCount > 0 && (
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-black px-1.5 text-xs text-white">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      {/* Filter popup */}
      {showFilters && (
        <div className="relative">
          <div className="absolute right-0 z-20 mt-3 w-full max-w-sm rounded-2xl border-2 border-black bg-white p-5 shadow-[4px_4px_0px_#000]">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-900">Filter books</h3>
                <p className="mt-1 text-xs text-gray-500">
                  Narrow down your search
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowFilters(false)}
                className="rounded-lg p-1 bg-red-300 hover:bg-red-700 hover:text-white"
              >
                <BiX size={30} />
              </button>
            </div>

            <div className="mt-5 space-y-4">
              {/* Subject */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Subject
                </label>

                <select
                  value={subject}
                  onChange={(e) => handleSubjectChange(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 hover:cursor-pointer bg-white px-3 py-2.5 text-sm outline-none focus:border-black"
                >
                  <option value="">All Subjects</option>
                  <option value="mathematics">Mathematics</option>
                  <option value="physics">Physics</option>
                  <option value="chemistry">Chemistry</option>
                  <option value="biology">Biology</option>
                  <option value="comp-sci">Computer Science</option>
                  <option value="english">English</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Class / Year */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Class / Year
                </label>

                <select
                  value={grade}
                  onChange={(e) => handleGradeChange(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 hover:cursor-pointer bg-white px-3 py-2.5 text-sm outline-none focus:border-black"
                >
                  <option value="">All Classes / Years</option>

                  <optgroup label="School">
                    <option value="class-1">Class 1</option>
                    <option value="class-2">Class 2</option>
                    <option value="class-3">Class 3</option>
                    <option value="class-4">Class 4</option>
                    <option value="class-5">Class 5</option>
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
                </select>
              </div>

              {/* Condition */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Condition
                </label>

                <select
                  value={condition}
                  onChange={(e) => handleConditionChange(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 hover:cursor-pointer bg-white px-3 py-2.5 text-sm outline-none focus:border-black"
                >
                  <option value="">Any Condition</option>
                  <option value="new">New</option>
                  <option value="like-new">Like New</option>
                  <option value="good">Good</option>
                  <option value="fair">Fair</option>
                  <option value="well-used">Well Used</option>
                </select>
              </div>

              {/* Exchange type */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Exchange type
                </label>

                <select
                  value={exchangeType}
                  onChange={(e) => handleExchangeTypeChange(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 hover:cursor-pointer bg-white px-3 py-2.5 text-sm outline-none focus:border-black"
                >
                  <option value="">Any Type</option>
                  <option value="donate">Donate</option>
                  <option value="swap">Swap</option>
                  <option value="sell">Sell</option>
                  <option value="lend">Lend</option>
                </select>
              </div>
            </div>

            {/* Clear */}
            {activeFilterCount > 0 && (
              <button
                type="button"
                onClick={clearFilters}
                className="mt-5 w-full rounded-lg border border-gray-300 hover:cursor-pointer py-2.5 text-sm font-medium hover:bg-gray-50"
              >
                Clear filters
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BookBar;
