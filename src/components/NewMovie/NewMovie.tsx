import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie, RequiredFieldsEmptyState } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

const EMPTY_MOVIE_DATA = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

const REQUIRED_FIELDS_INITIAL_EMPTY_STATE = {
  title: true,
  imgUrl: true,
  imdbUrl: true,
  imdbId: true,
};

const validURLPattern = new RegExp(
  '^((([A-Za-z]{3,9}:(?:\\/\\/)?)(?:[-;:&=+$,\\w]+@)?[A-Za-z0-9.-]+|' +
    '(?:www\\.|[-;:&=+$,\\w]+@)[A-Za-z0-9.-]+)' +
    '((?:\\/[+~%/.\\w-_]*)?\\??(?:[-+=&;%@,.\\w_]*)#?(?:[,.!/\\\\\\w]*))?)$',
);

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [movieData, setMovieData] = useState<Movie>({ ...EMPTY_MOVIE_DATA });
  const [emptyFields, setEmptyFields] = useState<RequiredFieldsEmptyState>({
    ...REQUIRED_FIELDS_INITIAL_EMPTY_STATE,
  });
  const [emptyFieldCount, setEmptyFieldCount] = useState(4);
  const hasEmptyRequiredField = emptyFieldCount > 0;

  const [customValidationErrorCount, setCustomValidationErrorCount] =
    useState(0);

  const isSubmitDisabled =
    hasEmptyRequiredField || customValidationErrorCount > 0;

  function handleChange(fieldName: keyof Movie, input: string) {
    let value = input.trim();
    let isFieldEmpty: boolean;
    let emptyFieldCountChange: number;

    if (value === '') {
      if (fieldName !== 'description') {
        isFieldEmpty = true;
        emptyFieldCountChange = 1;
      }
    } else {
      value = input;

      if (fieldName !== 'description') {
        isFieldEmpty = false;
        emptyFieldCountChange = -1;
      }
    }

    setMovieData(current => ({ ...current, [fieldName]: value }));

    if (fieldName !== 'description') {
      if (emptyFields[fieldName] === !isFieldEmpty!) {
        setEmptyFields(current => ({ ...current, [fieldName]: isFieldEmpty }));
        setEmptyFieldCount(current => current + emptyFieldCountChange!);
      }
    }
  }

  function handleCustomValidationError() {
    setCustomValidationErrorCount(current => current + 1);
  }

  function handleCustomValidationErrorClear() {
    setCustomValidationErrorCount(current => current - 1);
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (isSubmitDisabled) {
      return;
    }

    onAdd(movieData);
    setMovieData({ ...EMPTY_MOVIE_DATA });

    setCount(current => current + 1);
    setEmptyFields({ ...REQUIRED_FIELDS_INITIAL_EMPTY_STATE });
    setEmptyFieldCount(4);
  }

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={movieData.title}
        onChange={input => handleChange('title', input)}
        required
        onCustomValidationError={handleCustomValidationError}
        onCustomValidationErrorClear={handleCustomValidationErrorClear}
      />

      <TextField
        name="description"
        label="Description"
        value={movieData.description}
        onChange={input => handleChange('description', input)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movieData.imgUrl}
        onChange={input => handleChange('imgUrl', input)}
        required
        satisfiesCustomValidation={validURLPattern.test(movieData.imgUrl)}
        customValidationErrorMessage="The URL is invalid."
        onCustomValidationError={handleCustomValidationError}
        onCustomValidationErrorClear={handleCustomValidationErrorClear}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movieData.imdbUrl}
        onChange={input => handleChange('imdbUrl', input)}
        required
        satisfiesCustomValidation={validURLPattern.test(movieData.imdbUrl)}
        customValidationErrorMessage="The URL is invalid."
        onCustomValidationError={handleCustomValidationError}
        onCustomValidationErrorClear={handleCustomValidationErrorClear}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movieData.imdbId}
        onChange={input => handleChange('imdbId', input)}
        required
        onCustomValidationError={handleCustomValidationError}
        onCustomValidationErrorClear={handleCustomValidationErrorClear}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isSubmitDisabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
