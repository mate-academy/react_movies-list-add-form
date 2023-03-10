import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';
import { urlCheck } from '../../tools/UrlChecks';

type Props = {
  onAdd:(newMovie: Movie) => void,
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const DEFAULT_EMPTY_FIELDS = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };
  const [count, setCount] = useState(0);
  const [newMovie, setMovie] = useState(DEFAULT_EMPTY_FIELDS);
  const onChange = (name: string, value: string) => {
    setMovie(curr => ({
      ...curr,
      [name]: value,
    }));
  };

  const clearForm = () => {
    setMovie(DEFAULT_EMPTY_FIELDS);
  };

  const {
    title,
    description,
    imgUrl,
    imdbUrl,
    imdbId,
  } = newMovie;

  const isDisabled = !title
    || !imgUrl
    || !urlCheck(imgUrl)
    || !urlCheck(imdbUrl)
    || !imdbUrl
    || !imdbId;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onAdd(newMovie);
    setCount(curr => curr + 1);
    clearForm();
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={handleSubmit}
    >
      <h2 className="title">
        Add a movie
      </h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={onChange}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={onChange}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={onChange}
        isValid={urlCheck}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={onChange}
        isValid={urlCheck}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={onChange}
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
