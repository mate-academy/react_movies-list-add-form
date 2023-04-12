export interface Movie {
  title: string | null;
  description: string;
  imgUrl: string | null;
  imdbUrl: string | null;
  imdbId: string | null;
}

export interface ObjectKeys extends Movie {
  [key: string]: string | null;
}
