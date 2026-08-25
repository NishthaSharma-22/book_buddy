import { describe, it, expect } from "vitest";
import { filterBooks } from "./filterBooks";

const books = [
  {
    _id: "1",
    title: "Physics Vol 1",
    author: "Halliday",
    subject: "physics",
    grade: "class-11",
    description: "mechanics",
  },
  {
    _id: "2",
    title: "Algebra Basics",
    author: "Stewart",
    subject: "mathematics",
    grade: "class-10",
    description: "algebra",
  },
  {
    _id: "3",
    title: "Biology Guide",
    author: "Campbell",
    subject: "biology",
    grade: "class-12",
    description: "cells",
  },
];

describe("filterBooks", () => {
  it("returns all books when no filters applied", () => {
    expect(filterBooks(books, "", "", "")).toHaveLength(3);
  });

  it("filters by title search", () => {
    const result = filterBooks(books, "physics", "", "");
    expect(result).toHaveLength(1);
    expect(result[0]._id).toBe("1");
  });

  it("search is case-insensitive", () => {
    expect(filterBooks(books, "ALGEBRA", "", "")).toHaveLength(1);
  });

  it("filters by author", () => {
    const result = filterBooks(books, "campbell", "", "");
    expect(result).toHaveLength(1);
    expect(result[0]._id).toBe("3");
  });

  it("filters by subject dropdown", () => {
    const result = filterBooks(books, "", "mathematics", "");
    expect(result).toHaveLength(1);
    expect(result[0]._id).toBe("2");
  });

  it("filters by grade dropdown", () => {
    const result = filterBooks(books, "", "", "class-12");
    expect(result).toHaveLength(1);
    expect(result[0]._id).toBe("3");
  });

  it("combines search and subject filter", () => {
    expect(filterBooks(books, "vol", "physics", "")).toHaveLength(1);
  });

  it("returns empty array when nothing matches", () => {
    expect(filterBooks(books, "zzzznotabook", "", "")).toHaveLength(0);
  });
});
