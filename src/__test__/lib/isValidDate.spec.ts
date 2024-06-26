import { isValidDate } from "@/lib/isValidDate";

describe("isValidDate function", () => {
  test.each([
    ["2023-01-01", true],
    ["1995-12-17", true],
    ["incorrect-date-format", false],
    ["", false],
  ])('should return %s for the date string "%s"', (date, expected) => {
    expect(isValidDate(date)).toBe(expected);
  });
});
