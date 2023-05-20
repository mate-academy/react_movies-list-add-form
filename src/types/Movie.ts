export interface Movie {
  title: string;
  description: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
}

export interface IsMovie {
  title: boolean;
  imgUrl: boolean;
  imdbUrl: boolean;
  imdbId: boolean;
}

export interface SmallerMovieGroup {
  title: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
}
