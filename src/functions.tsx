import { patternRegular, patternURL } from './constants';
import { Movie } from './types/Movie';
import { MovieEror } from './types/MovieError';

type MovieCopy = {
  [key: string]: string;
};

export const hasInvalidField = (
  newMovie: Movie,
  movieEror: MovieEror,
): boolean => {
  const { description, ...rest } = newMovie;
  const movie: MovieCopy = { ...rest };

  let hasAllFields = true;
  let hasNoError = true;

  for (const key in movie) {
    if (movie[key] === '') {
      hasAllFields = false;
    }

    if (movieEror[key] !== false) {
      hasNoError = false;
    }
  }

  return !(hasAllFields && hasNoError);
};

export const check = {
  pattern(
    e: React.ChangeEvent<HTMLInputElement>,
    name: string,
    pattern: RegExp,
    setErrorMessage: React.Dispatch<React.SetStateAction<string>>,
    setMovieError: React.Dispatch<React.SetStateAction<MovieEror>>,
  ): void {
    if (!e.target.value.match(pattern)) {
      switch (pattern) {
        case patternURL:
          setErrorMessage('URL is not valid');
          setMovieError(oldMovieError => ({
            ...oldMovieError,
            [name]: true,
          }));
          break;

        case patternRegular:
          setErrorMessage('Special characters are not allowed');
          setMovieError(oldMovieError => ({
            ...oldMovieError,
            [name]: true,
          }));
          break;

        default:
          setErrorMessage('');
          setMovieError(oldMovieError => ({
            ...oldMovieError,
            [name]: false,
          }));
      }
    } else {
      setMovieError(oldMovieError => ({
        ...oldMovieError,
        [name]: false,
      }));
    }
  },

  inputField(
    field: string,
    name: string,
    label: string,
    required: boolean,
    setErrorMessage: React.Dispatch<React.SetStateAction<string>>,
    setMovieError: React.Dispatch<React.SetStateAction<MovieEror>>,
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
      setMovieError(oldMovieError => ({
        ...oldMovieError,
        [name]: true,
      }));
    } else if (required && !field) {
      setErrorMessage(`${label} is required`);
      setMovieError(oldMovieError => ({
        ...oldMovieError,
        [name]: true,
      }));
    } else {
      setMovieError(oldMovieError => ({
        ...oldMovieError,
        [name]: false,
      }));
    }

    return countSpaces >= field.length - 1;
  },
};
