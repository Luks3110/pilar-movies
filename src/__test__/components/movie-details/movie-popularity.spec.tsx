import { render, screen } from "@/__test__";
import MoviePopularity from "@/components/movie-details/movie-popularity";

describe("MoviePopularity Component", () => {
  it("should render the popularity number correctly", () => {
    render(<MoviePopularity popularity={6.5} />);
    const popularityElement = screen.getByText("6.5");
    expect(popularityElement).toBeInTheDocument();
  });

  it("should assign the correct color class based on the popularity level", () => {
    const { rerender } = render(<MoviePopularity popularity={4.9} />);
    let popularityElement = screen.getByText("4.9");
    expect(popularityElement).toHaveClass("text-red-800");

    rerender(<MoviePopularity popularity={5.5} />);
    popularityElement = screen.getByText("5.5");
    expect(popularityElement).toHaveClass("text-yellow-800");

    rerender(<MoviePopularity popularity={7.1} />);
    popularityElement = screen.getByText("7.1");
    expect(popularityElement).toHaveClass("text-green-800");
  });
});
