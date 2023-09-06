import { Movie } from '../types/Movie';

export const getIsButtonDisabled = (formValue: Movie) => {
  const {
    title,
    imgUrl,
    imdbUrl,
    imdbId,
  } = formValue;

  return !title || !imdbUrl || !imgUrl || !imdbId;
};
