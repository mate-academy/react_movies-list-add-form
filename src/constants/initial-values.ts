import { Movie } from '../types/Movie';

const initValid = false;

export const initialValidity = {
  title: initValid,
  imgUrl: initValid,
  imdbUrl: initValid,
  imdbId: initValid,
};

export const initValue = '';

export const newMovie: Movie = {
  title: initValue,
  description: initValue,
  imgUrl: initValue,
  imdbUrl: initValue,
  imdbId: initValue,
};
