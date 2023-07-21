import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

const initialValue = {
  title: '',
  description: '',
  imgUrl: '',
  imdbId: '',
  imdbUrl: '',
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [values, setValues] = useState(initialValue);
  const {
    title,
    description,
    imgUrl,
    imdbId,
    imdbUrl,
  } = values;

  const [count, setCount] = useState(0);

  const reset = () => {
    setValues(initialValue);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const newMovie: Movie = {
      title,
      description,
      imdbId,
      imdbUrl,
      imgUrl,
    };

    onAdd(newMovie);
    setCount(prevCount => prevCount + 1);

    reset();
  };

  const isBtnDisabled = (
    title.trim()
    && imdbId.trim()
    && imdbUrl.trim()
    && imgUrl.trim()
  );

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
        onChange={(newValue) => setValues({ ...values, title: newValue })}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={(newValue) => setValues({ ...values, description: newValue })}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={(newValue) => setValues({ ...values, imgUrl: newValue })}
        required
        customValidation
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={(newValue) => setValues({ ...values, imdbUrl: newValue })}
        required
        customValidation
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={(newValue) => setValues({ ...values, imdbId: newValue })}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isBtnDisabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
