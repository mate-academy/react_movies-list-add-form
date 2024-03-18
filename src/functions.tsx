import { patternRegular, patternURL } from './constants';
import { Movie } from './types/Movie';
type MovieCopy = {
  [key: string]: string;
};

export const hasInvalidField = (newMovie: Movie): boolean => {
  const { description, ...rest } = newMovie;
  const movie: MovieCopy = { ...rest };

  for (const key in movie) {
    if (movie[key] === '') {
      return true;
    }
  }

  return false;
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
