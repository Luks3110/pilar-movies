import { render, screen, fireEvent } from "@/__test__";
import SearchSwitch from "@/components/movies/search-switch";
import { timeWindowsOptions } from "@/lib/constants/timeWindowsOptions";

describe("SearchSwitch Component", () => {
  const mockHandleTimeWindow = jest.fn();

  it("should render correctly when searchType is 'trending'", () => {
    render(
      <SearchSwitch
        searchType="trending"
        timeWindow="day"
        handleTimeWindow={mockHandleTimeWindow}
        timeWindowsOptions={timeWindowsOptions}
      />
    );

    const toggleGroup = screen.getByRole("group");
    expect(toggleGroup).toBeInTheDocument();
    const dayOption = screen.getByText("Dia");
    const weekOption = screen.getByText("Semana");
    expect(dayOption).toBeInTheDocument();
    expect(weekOption).toBeInTheDocument();
  });

  it("should be hidden but still rendered when searchType is not 'trending'", () => {
    render(
      <SearchSwitch
        searchType="popular"
        timeWindow="day"
        handleTimeWindow={mockHandleTimeWindow}
        timeWindowsOptions={timeWindowsOptions}
      />
    );

    const searchSwitchContainer = screen.getByTestId("search-switch");
    expect(searchSwitchContainer).toBeInTheDocument();
    expect(searchSwitchContainer).toHaveClass("hidden");
  });

  it("should call handleTimeWindow with the correct value when an option is selected", () => {
    render(
      <SearchSwitch
        searchType="trending"
        timeWindow="day"
        handleTimeWindow={mockHandleTimeWindow}
        timeWindowsOptions={timeWindowsOptions}
      />
    );

    const weekOption = screen.getByText("Semana");
    fireEvent.click(weekOption);
    expect(mockHandleTimeWindow).toHaveBeenCalledWith("week");
  });
});
