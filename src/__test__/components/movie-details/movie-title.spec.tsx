import { render, screen } from "@/__test__";
import MovieTitle from "@/components/movie-details/movie-title";

describe("MovieTitle Component", () => {
  it("should render the movie title correctly", () => {
    const testTitle = "Inception";
    render(<MovieTitle title={testTitle} />);
    const titleElement = screen.getByText(testTitle);
    expect(titleElement).toBeInTheDocument();
  });
});
