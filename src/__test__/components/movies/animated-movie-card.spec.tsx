import { render, screen } from "@/__test__";
import AnimatedMovieCard from "@/components/movies/animated-movie-card";
import { IMAGE_BASE_URL } from "@/lib/constants/tmdb";
import { MovieSearchResponse } from "@/lib/types/search";

describe("AnimatedMovieCard Component", () => {
  const mockMovie: MovieSearchResponse = {
    id: 123,
    title: "Toy Story",
    poster_path: "/path/to/poster.jpg",
    popularity: 8.5,
    release_date: "1995-11-22",
    backdrop_path: "",
    original_title: "Toy Story",
    overview: "A story about toys",
    media_type: "movie",
    vote_average: 8.5,
    vote_count: 1000,
    genre_ids: [16],
    adult: false,
    original_language: "en",
    video: false,
  };

  it("should render movie title and year", () => {
    render(<AnimatedMovieCard movie={mockMovie} />);
    const titleElement = screen.getByText("Toy Story");
    const yearElement = screen.getByText("1995");
    expect(titleElement).toBeInTheDocument();
    expect(yearElement).toBeInTheDocument();
  });

  it("should display the movie poster", () => {
    render(<AnimatedMovieCard movie={mockMovie} />);
    const image = screen.getByRole("img", { name: "Toy Story" });
    expect(image).toHaveAttribute("src");
  });

  it("should link to the movie detail page", () => {
    render(<AnimatedMovieCard movie={mockMovie} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/movie/123");
  });

  it("should display the popularity score with one decimal place", () => {
    render(<AnimatedMovieCard movie={mockMovie} />);
    const popularity = screen.getByText("8.5");
    expect(popularity).toBeInTheDocument();
  });
});
