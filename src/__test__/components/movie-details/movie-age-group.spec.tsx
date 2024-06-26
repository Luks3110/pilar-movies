import { render, screen } from "@/__test__";
import MovieAgeGroup from "@/components/movie-details/movie-age-group";

describe("MovieAgeGroup Component", () => {
  it("should render with default age group when no ageGroup prop is provided", () => {
    render(<MovieAgeGroup />);
    const ageGroupElement = screen.getByTestId("age-group");
    expect(ageGroupElement).toHaveTextContent("L");
  });

  it("should render with provided age group", () => {
    const testAgeGroup = "PG-13";
    render(<MovieAgeGroup ageGroup={testAgeGroup} />);
    const ageGroupElement = screen.getByTestId("age-group");
    expect(ageGroupElement).toHaveTextContent(testAgeGroup);
  });
});
