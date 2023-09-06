import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';
import { getIsButtonDisabled, getIsValidUrl } from '../../Helpers';

type Props = {
  onAdd: (movie: Movie) => void
};

const defaultFormValue: Movie = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [formValues, setFormValues] = useState(defaultFormValue);
  const isButtonDisabled = getIsButtonDisabled(formValues)
    || !getIsValidUrl(formValues.imdbUrl)
    || !getIsValidUrl(formValues.imgUrl);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const key = event.target.name;

    setFormValues(prevValues => ({
      ...prevValues,
      [key]: event.target.value,
    }));
  };

  const handleAddMovie = () => {
    onAdd(formValues);
    setCount(prev => prev + 1);
    setFormValues(defaultFormValue);
  };

  return (
    <form className="NewMovie" key={count}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={formValues.title}
        onChange={handleOnChange}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={formValues.description}
        onChange={handleOnChange}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={formValues.imgUrl}
        onChange={handleOnChange}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={formValues.imdbUrl}
        onChange={handleOnChange}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={formValues.imdbId}
        onChange={handleOnChange}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            onClick={handleAddMovie}
            disabled={isButtonDisabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
