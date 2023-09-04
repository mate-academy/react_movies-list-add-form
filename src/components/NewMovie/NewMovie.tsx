import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type NewMovieProps = {
  onAdd: (newMovie: Movie) => void;
};

export const NewMovie: React.FC<NewMovieProps> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const initialState = {
    title: { value: '', hasError: false },
    description: { value: '', hasError: false },
    imgUrl: { value: '', hasError: false },
    imdbUrl: { value: '', hasError: false },
    imdbId: { value: '', hasError: false },
  };

  const [state, setState] = useState(initialState);

  const isValidNoExtraWhitespace = (str: string) => (
    !/^[\s]+$/.test(str)
      && !/^\s+/.test(str)
      && !/\s{2,}/.test(str)
  );

  const pattern = new RegExp(
    '^((([A-Za-z]{3,9}:(?:\\/\\/)?)(?:[-;:&=+$,\\w]+@)?[A-Za-z0-9.-]+|'
    + '(?:www\\.|[-;:&=+$,\\w]+@)[A-Za-z0-9.-]+)'
    + '((?:\\/[+~%/.\\w-_]*)?\\??(?:[-+=&;%@,.\\w_]*)#?(?:[,.!/\\\\\\w]*))?)$',
  );

  const isValidUrl = (url: string) => pattern.test(url);

  const isValidImdbId = (str: string) => (/^tt\d+$/.test(str));

  const handleInputChange = (
    fieldName: string,
    value: string,
    validator: (str: string) => boolean,
  ) => {
    const hasError = !validator(value);

    if (fieldName === 'imdbUrl' && !hasError) {
      const imdbIdMatch = value.match(/\/tt(\d+)/);

      if (imdbIdMatch && imdbIdMatch[1]) {
        const newImdbId = `tt${imdbIdMatch[1]}`;

        setState(prevState => ({
          ...prevState,
          imdbId: {
            value: newImdbId,
            hasError: false,
          },
        }));
      }
    }

    setState(prevState => ({
      ...prevState,
      [fieldName]: {
        value,
        hasError,
      },
    }));
  };

  const isFormValid = () => {
    return Object.entries(state)
      .every(([key, { value, hasError }]) => {
        if (key === 'description') {
          return !hasError;
        }

        return value.trim() !== '' && !hasError;
      });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const newMovieFromForm = {
      title: state.title.value,
      description: state.description.value,
      imgUrl: state.imgUrl.value,
      imdbUrl: state.imdbUrl.value,
      imdbId: state.imdbId.value,
    };

    onAdd(newMovieFromForm);

    setState({
      title: { value: '', hasError: false },
      description: { value: '', hasError: false },
      imgUrl: { value: '', hasError: false },
      imdbUrl: { value: '', hasError: false },
      imdbId: { value: '', hasError: false },
    });

    setCount(count + 1);
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={handleSubmit}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={state.title.value}
        onChange={(newValue: string) => handleInputChange(
          'title',
          newValue,
          isValidNoExtraWhitespace,
        )}
        hasWhiteSpaceError={state.title.hasError}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={state.description.value}
        onChange={(newValue: string) => handleInputChange(
          'description',
          newValue,
          isValidNoExtraWhitespace,
        )}
        hasWhiteSpaceError={state.description.hasError}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={state.imgUrl.value}
        onChange={(newValue: string) => handleInputChange(
          'imgUrl',
          newValue,
          isValidUrl,
        )}
        hasValidUrlError={state.imgUrl.hasError}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={state.imdbUrl.value}
        onChange={(newValue: string) => handleInputChange(
          'imdbUrl',
          newValue,
          isValidUrl,
        )}
        hasValidUrlError={state.imdbUrl.hasError}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={state.imdbId.value}
        onChange={(newValue: string) => handleInputChange(
          'imdbId',
          newValue,
          isValidImdbId,
        )}
        hasValidImdbError={state.imdbId.hasError}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isFormValid()}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
