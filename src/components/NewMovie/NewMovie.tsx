import React, { FormEvent, useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

const urlValidation = (url: string) => {
  // eslint-disable-next-line max-len
  const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

  return url.match(pattern);
};

type InitialFields = {
  count: number;
  title: string;
  description: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
  validationError: boolean;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const EMPTY_STATE = {
    count: 0,
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    validationError: false,
  };
  const [initialFields, setFields] = useState<InitialFields>(EMPTY_STATE);

  const isDisabled = !(
    !!initialFields.title
    && !!initialFields.imgUrl
    && !!initialFields.imdbUrl
    && !!initialFields.imdbId
  );

  const movie = {
    title: initialFields.title,
    description: initialFields.description,
    imgUrl: initialFields.imgUrl,
    imdbUrl: initialFields.imdbUrl,
    imdbId: initialFields.imdbId,
  };

  const handleChange = (newValue: string, elementName: string) => {
    setFields(state => ({
      ...state,
      [elementName]: newValue,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      !(urlValidation(initialFields.imgUrl)
        && urlValidation(initialFields.imdbUrl)
      )) {
      setFields(state => ({
        ...state,
        validationError: true,
      }));

      return;
    }

    onAdd(movie);
    setFields(state => ({
      ...EMPTY_STATE,
      count: state.count + 1,
    }));
  };

  return (
    <form
      className="NewMovie"
      key={initialFields.count}
      onSubmit={handleSubmit}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={initialFields.title}
        onChange={handleChange}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={initialFields.description}
        onChange={handleChange}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={initialFields.imgUrl}
        onChange={handleChange}
        required
      />

      <TextField
        name="imdbUrl"
        value={initialFields.imdbUrl}
        onChange={handleChange}
        required
      />

      <TextField
        name="imdbId"
        value={initialFields.imdbId}
        onChange={handleChange}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isDisabled}
          >
            Add
          </button>
          {initialFields.validationError && (
            <p className="help is-danger"> Your url is not valid!</p>)}
        </div>
      </div>
    </form>
  );
};
