import { render, screen } from "@/__test__";
import MovieBackdrop from "@/components/movie-details/movie-backdrop";

describe("MovieBackdrop Component", () => {
  it("should render the backdrop image with the provided src and alt", () => {
    const testSrc = "/test-image.jpg";
    const testAlt = "Test Image";
    render(<MovieBackdrop src={testSrc} alt={testAlt} />);
    const imageElement = screen.getByRole("img", { name: testAlt });
    expect(imageElement).toHaveAttribute("src");
    expect(imageElement).toHaveAttribute("alt", testAlt);
  });

  it("should fill the parent container", () => {
    render(<MovieBackdrop src="/test-image.jpg" alt="Test Image" />);
    const imageElement = screen.getByRole("img");
    expect(imageElement).toHaveClass("w-full h-full object-cover");
  });
});
