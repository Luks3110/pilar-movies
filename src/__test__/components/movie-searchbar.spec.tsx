import { render, screen, fireEvent } from "..";
import MovieSearchbar from "@/components/movie-searchbar";
import useFilterStore from "@/hooks/stores/filter-store";

jest.mock("@/hooks/stores/filter-store");

describe("MovieSearchbar", () => {
  const mockSetSearch = jest.fn();
  const mockSetSearchType = jest.fn();

  beforeEach(() => {
    (useFilterStore as unknown as jest.Mock).mockReturnValue({
      search: "",
      searchType: "normal",
      setSearch: mockSetSearch,
      setSearchType: mockSetSearchType,
    });
  });

  it("renders without crashing", () => {
    render(<MovieSearchbar />);
    expect(
      screen.getByPlaceholderText("Procure por filmes...")
    ).toBeInTheDocument();
  });

  it("updates search input correctly", () => {
    render(<MovieSearchbar />);
    const input = screen.getByPlaceholderText("Procure por filmes...");
    fireEvent.change(input, { target: { value: "Matrix" } });
    expect(mockSetSearch).toHaveBeenCalledWith("Matrix");
  });

  it("toggles search type to trending when trending button is clicked", () => {
    render(<MovieSearchbar />);
    const trendingButton = screen.getByText("Trending");
    fireEvent.click(trendingButton);
    expect(mockSetSearchType).toHaveBeenCalledWith("trending");
  });

  it("toggles search type to popular when popular button is clicked", () => {
    render(<MovieSearchbar />);
    const popularButton = screen.getByText("Popular");
    fireEvent.click(popularButton);
    expect(mockSetSearchType).toHaveBeenCalledWith("popular");
  });
});
