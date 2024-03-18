import { patternRegular, patternURL } from './constants';
import { Movie } from './types/Movie';
import { MovieEror } from './types/MovieError';

type MovieCopy = {
  [key: string]: string;
};

type MovieErrorCopy = {
  [key: string]: boolean;
};

export const hasInvalidField = (
  newMovie: Movie,
  movieEror: MovieEror,
): boolean => {
  const { description, ...rest } = newMovie;
  const movie: MovieCopy = { ...rest };
  const movieErrorCopy: MovieErrorCopy = { ...movieEror };
  let hasAllFields = true;
  let hasNoError = true;

  for (const key in movie) {
    if (movie[key] === '') {
      hasAllFields = false;
    }

    if (movieErrorCopy[key]) {
      hasNoError = false;
    }
  }

  return !(hasAllFields && hasNoError);
};

export const check = {
  pattern(
    e: React.ChangeEvent<HTMLInputElement>,
    pattern: RegExp,
    setErrorMessage: React.Dispatch<React.SetStateAction<string>>,
  ): void {
    if (!e.target.value.match(pattern)) {
      switch (pattern) {
        case patternURL:
          setErrorMessage('URL is not valid');
          break;
        case patternRegular:
          setErrorMessage('Special characters are not allowed');
          break;
        default:
          setErrorMessage('');
      }
    }
  },

  inputField(
    field: string,
    label: string,
    required: boolean,
    setErrorMessage: React.Dispatch<React.SetStateAction<string>>,
  ): boolean {
    let countSpaces = 0;

    for (const letter of field) {
      if (letter === ' ') {
        countSpaces++;
      } else {
        countSpaces = 0;
      }
    }

    if (countSpaces >= 1) {
      setErrorMessage(`${label} is not valid`);
    }

    if (required && !field) {
      setErrorMessage(`${label} is required`);
    }

    return countSpaces >= field.length - 1;
  },
};
