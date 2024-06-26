import { render, screen } from "@/__test__";
import MovieCast from "@/components/movie-details/movie-cast";
import { TMDB_URL } from "@/lib/constants/tmdb";
import { Cast } from "@/lib/types/movieDetails";

describe("MovieCast Component", () => {
  const mockCast: Cast[] = [
    {
      id: 1,
      name: "Actor One",
      original_name: "Actor One",
      character: "Character One",
      profile_path: "/path/to/image1.jpg",
      adult: false,
      gender: 1,
      known_for_department: "Acting",
      popularity: 10,
      cast_id: 1,
      credit_id: "credit1",
      order: 1,
    },
    {
      id: 2,
      name: "Actor Two",
      original_name: "Actor Two",
      character: "Character Two",
      profile_path: "/path/to/image2.jpg",
      adult: false,
      gender: 1,
      known_for_department: "Acting",
      popularity: 10,
      cast_id: 2,
      credit_id: "credit2",
      order: 2,
    },
    {
      id: 3,
      name: "Actor Three",
      original_name: "Actor Three",
      character: "Character Three",
      profile_path: "/path/to/image3.jpg",
      adult: false,
      gender: 1,
      known_for_department: "Acting",
      popularity: 10,
      cast_id: 3,
      credit_id: "credit3",
      order: 3,
    },
    {
      id: 4,
      name: "Actor Four",
      original_name: "Actor Four",
      character: "Character Four",
      profile_path: "/path/to/image4.jpg",
      adult: false,
      gender: 1,
      known_for_department: "Acting",
      popularity: 10,
      cast_id: 4,
      credit_id: "credit4",
      order: 4,
    },
    {
      id: 5,
      name: "Actor Five",
      original_name: "Actor Five",
      character: "Character Five",
      profile_path: "/path/to/image5.jpg",
      adult: false,
      gender: 1,
      known_for_department: "Acting",
      popularity: 10,
      cast_id: 5,
      credit_id: "credit5",
      order: 5,
    },
  ];

  it("should render the correct number of cast members", () => {
    render(<MovieCast cast={mockCast} />);
    const castMembers = screen.getAllByRole("link");
    expect(castMembers).toHaveLength(5);
  });

  it("should display the correct names and characters for each cast member", () => {
    render(<MovieCast cast={mockCast} />);
    mockCast.forEach((member) => {
      expect(screen.getByText(member.original_name)).toBeInTheDocument();
      expect(screen.getByText(member.character)).toBeInTheDocument();
    });
  });

  it("should link to the correct TMDB person page for each cast member", () => {
    render(<MovieCast cast={mockCast} />);
    mockCast.forEach((member) => {
      const linkElement = screen.getByTestId(`cast-member-${member.id}`);
      expect(linkElement).toHaveAttribute(
        "href",
        `${TMDB_URL}person/${member.id}`
      );
    });
  });
});
