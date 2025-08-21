export interface Movie {
  title: string;
  description: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
}

export interface Form {
  title: string;
  description: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
}
export interface FormErrors {
  title: boolean;
  description: boolean;
  imgUrl: boolean;
  imdbUrl: boolean;
  imdbId: boolean;
}
