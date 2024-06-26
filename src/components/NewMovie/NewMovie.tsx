import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

const EMPTY_MOVIE: Movie = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [disabled, setDisabled] = useState(true);
  const [newMovie, setNewMovie] = useState({ ...EMPTY_MOVIE });

  if (
    !disabled &&
    (!newMovie.title ||
      !newMovie.imgUrl ||
      !newMovie.imdbUrl ||
      !newMovie.imdbId)
  ) {
    setDisabled(true);
  }

  if (
    disabled &&
    newMovie.title.trim() &&
    newMovie.imgUrl.trim() &&
    newMovie.imdbUrl.trim() &&
    newMovie.imdbId.trim()
  ) {
    setDisabled(false);
  }

  const resetFormFields = () => {
    setNewMovie({ ...EMPTY_MOVIE });
    setDisabled(true);
  };

  const addNewMovie = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    for (const key in newMovie) {
      newMovie[key] = newMovie[key].trim();
    }

    setCount(count + 1);

    onAdd(newMovie);

    resetFormFields();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setNewMovie((currentMovie: Movie) => ({ ...currentMovie, [name]: value }));
  };

  return (
    <form className="NewMovie" key={count} onSubmit={addNewMovie}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={newMovie.title}
        onChange={handleChange}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={newMovie.description}
        onChange={handleChange}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={newMovie.imgUrl}
        onChange={handleChange}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newMovie.imdbUrl}
        onChange={handleChange}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={newMovie.imdbId}
        onChange={handleChange}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={disabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
