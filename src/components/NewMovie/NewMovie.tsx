import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';
import { DEFAULT_FORM_VALUES } from '../../variables/DEFAULT_FORM_VALUES';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);

  const [formValues, setFormValues] = useState(DEFAULT_FORM_VALUES);

  const {
    title,
    description,
    imgUrl,
    imdbUrl,
    imdbId,
  } = formValues;

  const isFormValid = title.trim()
  && imgUrl.trim()
  && imdbUrl.trim()
  && imdbId.trim();

  const resetForm = () => {
    setFormValues(DEFAULT_FORM_VALUES);
  };

  const handleChange = (currentValue: string, name: string) => {
    setFormValues((prevValue) => ({
      ...prevValue,
      [name]: currentValue,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isFormValid) {
      return;
    }

    onAdd({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });

    setCount(prevCount => prevCount + 1);

    resetForm();
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
        value={title}
        onChange={handleChange}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={handleChange}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={handleChange}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={handleChange}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={handleChange}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isFormValid}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
