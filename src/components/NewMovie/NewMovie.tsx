import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

const initialValues = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

export const NewMovie: React.FC<Props> = ({ onAdd: onSubmit }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [values, setValues] = useState(initialValues);
  const isDisabled =
    !values.title.trim() ||
    !values.imgUrl.trim() ||
    !values.imdbUrl.trim() ||
    !values.imdbId.trim();

  const reset = () => {
    setValues(initialValues);
    setCount(count + 1);
  };

  const handleChange = (first: keyof typeof values) => (value: string) => {
    setValues(current => ({ ...current, [first]: value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    onSubmit(values);
    reset();
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={values.title}
        onChange={handleChange('title')}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={values.description}
        onChange={handleChange('description')}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={values.imgUrl}
        onChange={handleChange('imgUrl')}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={values.imdbUrl}
        onChange={handleChange('imdbUrl')}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={values.imdbId}
        onChange={handleChange('imdbId')}
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
        </div>
      </div>
    </form>
  );
};
