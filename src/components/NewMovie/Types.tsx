export type Props = {
  addMovie: (movie: Movie) => void,
};

export type MovieAtribut = {
  title: string,
  description: string,
  imgUrl: string,
  imdbUrl: string,
  imdbId: string,
};

export type MovieAtributState = {
  istitleEmpty: boolean,
  isdescriptionEmpty: boolean,
  isimgUrlEmpty: boolean,
  isimdbUrlEmpty: boolean,
  isimdbIdEmpty: boolean,
};

export interface State extends MovieAtribut, MovieAtributState {}
