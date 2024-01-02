export interface Movie {
  title: string;
  description: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
  [key: string]: string;
}

export type MovieList = Movie[];
