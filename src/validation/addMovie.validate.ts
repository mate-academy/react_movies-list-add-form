import { Movie } from '../types/Movie';
import { getIsUrlValid } from '../helpers/getIsUrlValid';

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
    || !getIsUrlValid(imdbUrl)
    || !getIsUrlValid(imgUrl)
  );
}
