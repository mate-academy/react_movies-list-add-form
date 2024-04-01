import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [newMovie, setNewMovie] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const newMovieInputs = (value: string, key: string) => {
    setNewMovie({
      ...newMovie,
      [key]: value,
    });
  };

  const fieldsCheck = () => {
    if (
      newMovie.title.trim() &&
      newMovie.imdbId.trim() &&
      newMovie.imdbUrl.trim() &&
      newMovie.imgUrl.trim()
    ) {
      return false;
    }

    return true;
  };

  const reset = () => {
    setNewMovie({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  const submitNewMovie = (event: React.FormEvent) => {
    event.preventDefault();

    onAdd(newMovie);

    reset();

    setCount(count + 1);
  };

  return (
    <form className="NewMovie" key={count} onSubmit={submitNewMovie}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={newMovie.title}
        onChange={newMovieInputs}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={newMovie.description}
        onChange={newMovieInputs}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={newMovie.imgUrl}
        onChange={newMovieInputs}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newMovie.imdbUrl}
        onChange={newMovieInputs}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={newMovie.imdbId}
        onChange={newMovieInputs}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={fieldsCheck()}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
