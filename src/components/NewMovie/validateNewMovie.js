import { requiredValidator, urlValidator } from '../../utils';

export function validateNewMovie(newMovie) {
  const errorsEntries = Object.entries(newMovie).map(([name, value]) => {
    let error = requiredValidator(name, value);

    if (!error && (name === 'imgUrl' || name === 'imdbUrl')) {
      error = urlValidator(name, value);
    }

    return [name, error];
  });

  const hasErrors = errorsEntries.some(([, error]) => !!error);

  const errors = errorsEntries.reduce((acc, [name, error]) => {
    return {
      ...acc,
      [name]: error,
    };
  }, {});

  return {
    errors,
    hasErrors,
  };
}
