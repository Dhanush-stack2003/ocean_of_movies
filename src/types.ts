export type searchBarProps = {
  onSearch: () => void;
};

export interface movie {
  Year: string;
  imdbID: string;
  Poster: string;
  Title: string;
  Genre: string;
  Released: string;
  Actors: string;
  Plot: string;
  imdbRating: string;
  Language: string;
  Runtime: string;
  Director: string;
  Response: string;
}