import { describe, expect, it } from "vitest";
import { capitalize, getPastelColor } from "./utils";

describe("capitalize", () => {
  it("capitalizes the first letter", () => {
    expect(capitalize("mathematics")).toBe("Mathematics");
  });
  it("leaves the rest of the string unchanged", () => {
    expect(capitalize("computer science")).toBe("Computer science");
  });
  it("handles a single character", () => {
    expect(capitalize("a")).toBe("A");
  });

  it("handles an already capitalized string", () => {
    expect(capitalize("Physics")).toBe("Physics");
  });

  it("returns empty string for empty input", () => {
    expect(capitalize("")).toBe("");
  });
});

describe("getPastelColor", () => {
  it("returns a Tailwind bg class", () => {
    expect(getPastelColor("abc123")).toMatch(/^bg-/);
  });

  it("is deterministic — same id always returns same color", () => {
    expect(getPastelColor("someId")).toBe(getPastelColor("someId"));
  });

  it("returns different colors for different ids", () => {
    const colors = new Set(
      ["a", "b", "c", "d", "e", "f", "g", "h"].map(getPastelColor),
    );
    expect(colors.size).toBeGreaterThan(1);
  });

  it("always returns a value from the known color list", () => {
    const validColors = [
      "bg-pink-100",
      "bg-purple-100",
      "bg-blue-100",
      "bg-green-100",
      "bg-yellow-100",
      "bg-orange-100",
      "bg-rose-100",
      "bg-indigo-100",
    ];
    expect(validColors).toContain(getPastelColor("test-id"));
  });
});
