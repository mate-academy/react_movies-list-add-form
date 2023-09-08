import { Movie } from '../types/Movie';
import { IMDB_URL_REGEX } from '../constants/regex.ts';

export function getAddMovieFormIsValid(formValue: Movie) {
  const {
    title,
    imgUrl,
    imdbUrl,
    imdbId,
  } = formValue;

  return !(
    !title.trim()
    || !imdbId.trim()
    || !IMDB_URL_REGEX.test(imdbUrl)
    || !IMDB_URL_REGEX.test(imgUrl)
  );
}
