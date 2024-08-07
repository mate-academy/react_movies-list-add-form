import { URL_PATTERN } from '../utils/constants';

export const AddMovieSchema = {
  imgUrl: (value: string) => {
    const isValid = URL_PATTERN.test(value);

    if (!isValid) {
      return 'ImgUrl value is invalid';
    }

    return false;
  },
  imdbUrl: (value: string) => {
    const isValid = URL_PATTERN.test(value);

    if (!isValid) {
      return 'ImgUrl value is invalid';
    }

    return false;
  },
};
