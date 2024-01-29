export interface MoviesSearchDto {
  Search: Movie[];
}

export interface Movie {
  Title: string;
  Year: string;
  Poster: string;
  Type: string;
  imdbID: string;
}
