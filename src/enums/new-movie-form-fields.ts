import { Movie } from '../types/Movie';

type NewMovieFormFields = {
  name: keyof Movie,
  label: string,
  required: boolean,
  validationCallback?: (value: string) => boolean,
  validationErrorMessage?: string,
};

// eslint-disable-next-line max-len
const urlValidationPattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

export const newMovieFormFields: NewMovieFormFields[] = [
  {
    name: 'title',
    label: 'Title',
    required: true,
  },
  {
    name: 'description',
    label: 'Description',
    required: false,
  },
  {
    name: 'imgUrl',
    label: 'Image URL',
    required: true,
    validationCallback: (value) => urlValidationPattern.test(value),
  },
  {
    name: 'imdbUrl',
    label: 'Imdb URL',
    required: true,
    validationCallback: (value) => urlValidationPattern.test(value),
    validationErrorMessage: 'URL is not valid',
  },
  {
    name: 'imdbId',
    label: 'Imdb ID',
    required: true,
  },
];
