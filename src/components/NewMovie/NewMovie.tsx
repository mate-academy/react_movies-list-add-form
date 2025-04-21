import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

const defaultValues: Movie = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

interface Props {
  onAdd: (movie: Movie) => void;
}

export const NewMovie = ({ onAdd }: Props) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [values, setValues] = useState<Movie>(defaultValues);
  const [canSubmit, setCanSubmit] = useState(false);

  const handleSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onAdd(values);
    setValues(defaultValues);
    setCount(currentCount => currentCount + 1);
  };

  const testHttpValue = (value: string, label = '') => {
    if (
      // eslint-disable-next-line max-len
      /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/.test(
        value,
      )
    ) {
      return '';
    }

    return `${label} has incorrect url`;
  };

  const handleFieldChange = (newValues: Partial<Movie>) => {
    const currentValues = { ...values, ...newValues };
    let isValid = !Object.values({ ...currentValues, description: '1' }).some(
      value => value.trim() === '',
    );

    isValid =
      isValid &&
      !testHttpValue(currentValues.imdbUrl) &&
      !testHttpValue(currentValues.imgUrl);

    setValues(currentValues);
    setCanSubmit(isValid);
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmitForm}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={values.title}
        onChange={newValue => {
          handleFieldChange({ title: newValue });
        }}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={values.description}
        onChange={newValue => {
          handleFieldChange({ description: newValue });
        }}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={values.imgUrl}
        onChange={newValue => {
          handleFieldChange({ imgUrl: newValue });
        }}
        required
        validators={[testHttpValue]}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={values.imdbUrl}
        onChange={newValue => {
          handleFieldChange({ imdbUrl: newValue });
        }}
        required
        validators={[testHttpValue]}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={values.imdbId}
        onChange={newValue => {
          handleFieldChange({ imdbId: newValue });
        }}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!canSubmit}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
