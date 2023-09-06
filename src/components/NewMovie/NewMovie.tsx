import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (newMovie: Movie) => void
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const DEFAULT_INPUT_VAL = '';

  const [count, setCount] = useState(0);
  const [title, setTitle] = useState(DEFAULT_INPUT_VAL);
  const [description, setDescription] = useState(DEFAULT_INPUT_VAL);
  const [imgUrl, setImgUrl] = useState(DEFAULT_INPUT_VAL);
  const [imdbUrl, setImdbUrl] = useState(DEFAULT_INPUT_VAL);
  const [imdbId, setImdbId] = useState(DEFAULT_INPUT_VAL);

  const isSubmitBtnDisabled = title === DEFAULT_INPUT_VAL
    || imdbUrl === DEFAULT_INPUT_VAL
    || imgUrl === DEFAULT_INPUT_VAL
    || imdbUrl === DEFAULT_INPUT_VAL
    || imdbId === DEFAULT_INPUT_VAL;

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newMovie: Movie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    setTitle(DEFAULT_INPUT_VAL);
    setDescription(DEFAULT_INPUT_VAL);
    setImgUrl(DEFAULT_INPUT_VAL);
    setImdbUrl(DEFAULT_INPUT_VAL);
    setImdbId(DEFAULT_INPUT_VAL);

    onAdd(newMovie);
    setCount(prevVal => prevVal + 1);
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={handleFormSubmit}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={setTitle}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={setDescription}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={setImgUrl}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={setImdbUrl}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={setImdbId}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isSubmitBtnDisabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
