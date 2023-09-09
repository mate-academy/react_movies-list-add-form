import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface Props {
  onAdd: (newMovie: Movie) => void;
}

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [newMovie, setNewMovie] = useState<Movie>({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const disabledBtn = newMovie.title.trim()
    && newMovie.imgUrl.trim()
    && newMovie.imdbUrl.trim()
    && newMovie.imdbId.trim();

  const resetForm = () => {
    setNewMovie({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  const changeField = (target: EventTarget & HTMLInputElement) => {
    setNewMovie({ ...newMovie, [target.name]: target.value });
  };

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setCount(prev => prev + 1);
    onAdd(newMovie);
    resetForm();
  };

  return (
    <form
      className="NewMovie"
      onSubmit={submitForm}
      key={count}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={newMovie.title}
        onChange={changeField}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={newMovie.description}
        onChange={changeField}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={newMovie.imgUrl}
        onChange={changeField}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newMovie.imdbUrl}
        onChange={changeField}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={newMovie.imdbId}
        onChange={changeField}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!disabledBtn}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
