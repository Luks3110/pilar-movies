import { render, screen } from "@/__test__";
import MovieYear from "@/components/movie-details/movie-year";

describe("MovieYear Component", () => {
  it("should render the year extracted from the date prop", () => {
    const testDate = "1995-12-17";
    render(<MovieYear date={testDate} />);
    const yearElement = screen.getByText("(1995)");
    expect(yearElement).toBeInTheDocument();
  });

  it("should return null when date is empty", () => {
    const testDate = "";
    render(<MovieYear date={testDate} />);
    expect(() => screen.getByTestId("movie-year")).toThrow();
  });

  it("should return null when date is invalid", () => {
    const testDate = "invalid-date";
    render(<MovieYear date={testDate} />);
    expect(() => screen.getByTestId("movie-year")).toThrow();
  });
});
