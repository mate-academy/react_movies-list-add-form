import { Movie } from './Movie';
export const URL_REGEX =
  // eslint-disable-next-line max-len
  /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

export const isValidMovie = ({ title, imgUrl, imdbUrl, imdbId }: Movie) => {
  return (
    title.trim() &&
    imgUrl.trim() &&
    imdbUrl.trim() &&
    imdbId.trim() &&
    URL_REGEX.test(imgUrl) &&
    URL_REGEX.test(imdbUrl)
  );
};
