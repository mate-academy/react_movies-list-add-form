export interface Movie {
  title: string;
  description: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
}

export interface RequiredMovieFields {
  title: boolean;
  imgUrl: boolean;
  imdbUrl: boolean;
  imdbId: boolean;
}
