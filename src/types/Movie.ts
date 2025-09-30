export interface Movie {
  title: string;
  description: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
}

export type MovieFields = keyof Movie;
