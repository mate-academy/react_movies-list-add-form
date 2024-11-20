import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';
import { validateUrl } from '../../utils';

type Props = {
  onAdd: (newMovie: Movie) => void;
};

type DefaultState = {
  title: string;
  description: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
};

const defaultState: DefaultState = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s

  const [count, setCounter] = useState(0);
  const [formState, setFormState] = useState(defaultState);

  const { description, ...restFormState } = formState;

  const isValidForm = Object.values(restFormState).every(
    value => !!value.trim(),
  );

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onAdd(formState);
    setFormState(defaultState);

    setCounter(currentValue => currentValue + 1);
  };

  const handleChangeByField = (field: keyof DefaultState) => {
    return (value: string) => {
      setFormState(preState => {
        return {
          ...preState,
          [field]: value,
        };
      });
    };
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleFormSubmit}>
      <h2 className="title">Add a movie</h2>
      <TextField
        name="title"
        label="Title"
        value={formState.title}
        onChange={handleChangeByField('title')}
        required
      />
      <TextField
        name="description"
        label="Description"
        value={formState.description}
        onChange={handleChangeByField('description')}
      />
      <TextField
        name="imgUrl"
        label="Image URL"
        value={formState.imgUrl}
        validate={validateUrl}
        onChange={handleChangeByField('imgUrl')}
        required
      />
      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={formState.imdbUrl}
        validate={validateUrl}
        onChange={handleChangeByField('imdbUrl')}
        required
      />
      <TextField
        name="imdbId"
        label="Imdb ID"
        value={formState.imdbId}
        onChange={handleChangeByField('imdbId')}
        required
      />
      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isValidForm}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
