import { render, screen } from "@/__test__";
import MoviePoster from "@/components/movie-details/movie-poster";

describe("MoviePoster Component", () => {
  it("should render the image with correct src and alt text", () => {
    const testSrc = "/path/to/test/image.jpg";
    const testAlt = "Test Image";
    render(<MoviePoster src={testSrc} alt={testAlt} />);
    const imageElement = screen.getByRole("img");
    expect(imageElement).toHaveAttribute("src");
    expect(imageElement).toHaveAttribute("alt", testAlt);
  });

  it("should have the correct styling classes", () => {
    render(<MoviePoster src="/path/to/test/image.jpg" alt="Test Image" />);
    const containerDiv = screen.getByRole("img").parentElement;
    expect(containerDiv).toHaveClass(
      "rounded-lg z-20 w-full h-full sm:w-auto lg:h-[35rem] lg:w-[20rem] px-2 sm:px-24 flex flex-col justify-center items-center transition-transform duration-300 ease-in-out hover:scale-105 overflow-hidden relative shadow-slate-950"
    );
  });
});
