import MovieDetail from "@/components/movie-detail";
import useMovieDetails from "@/hooks/queries/useMovieDetails";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { render, screen } from "..";

jest.mock("@/hooks/queries/useMovieDetails");
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));
jest.mock("@/components/ui/use-toast");

describe("MovieDetail", () => {
  const mockPush = jest.fn();
  const mockReplace = jest.fn();
  const mockToast = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
      replace: mockReplace,
    });
    (useToast as jest.Mock).mockReturnValue({
      toast: mockToast,
    });
  });

  it("renders loading state correctly", () => {
    (useMovieDetails as jest.Mock).mockReturnValue({
      movie: null,
      isLoading: true,
      isError: false,
    });

    render(<MovieDetail movieId={123} />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders error state and redirects", () => {
    (useMovieDetails as jest.Mock).mockReturnValue({
      movie: null,
      isLoading: false,
      isError: true,
    });

    render(<MovieDetail movieId={123} />);
    expect(mockToast).toHaveBeenCalledWith({
      title: "Algo deu errado ao buscar os detalhes do moviee",
      description: "Por favor, tente novamente mais tarde",
      variant: "destructive",
    });
    expect(mockReplace).toHaveBeenCalledWith("/");
  });

  it("renders movie details when data is available", () => {
    const movieData = {
      id: 5,
      title: "Inception",
      backdrop_path: "/pathToBackdrop.jpg",
      poster_path: "/pathToPoster.jpg",
      release_date: "2010-07-16",
      vote_average: 8.8,
      genres: [{ name: "Action" }, { name: "Adventure" }],
      overview:
        "A thief who steals corporate secrets through the use of dream-sharing technology...",
      credits: {
        cast: [
          {
            name: "Leonardo DiCaprio",
            original_name: "Leonardo DiCaprio",
            character: "Leonardo DiCaprio",
          },
        ],
      },
      release_dates: {
        results: [
          {
            iso_3166_1: "BR",
            release_dates: [{ certification: "PG-13" }],
          },
        ],
      },
    };

    (useMovieDetails as jest.Mock).mockReturnValue({
      movie: movieData,
      isLoading: false,
      isError: false,
    });

    render(<MovieDetail movieId={123} />);
    expect(screen.getByText("Inception")).toBeInTheDocument();
    expect(screen.getByText("(2010)")).toBeInTheDocument();
    expect(screen.getByText("PG-13")).toBeInTheDocument();
    expect(screen.getByText("Action, Adventure")).toBeInTheDocument();
    expect(
      screen.getByText(
        "A thief who steals corporate secrets through the use of dream-sharing technology..."
      )
    ).toBeInTheDocument();
    expect(screen.getByTestId("cast-member-name")).toBeInTheDocument();
    expect(screen.getByTestId("cast-member-character")).toBeInTheDocument();
  });
});
