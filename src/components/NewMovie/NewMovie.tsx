import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';
import { initialMovieState } from '../../services/initialMovieState';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [movie, setMovie] = useState(initialMovieState);

  const hasInvalidFields = !movie.title || !movie.imgUrl
    || !movie.imdbUrl || !movie.imdbId;

  const resetForm = () => {
    setMovie(initialMovieState);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (hasInvalidFields) {
      return;
    }

    onAdd(movie);

    resetForm();
    setCount(currentCount => currentCount + 1);
  };

  const handleMovie: React.ChangeEventHandler<HTMLInputElement> = (event => {
    const { value, name } = event.target;

    setMovie({
      ...movie,
      [name]: value,
    });
  });

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
        value={movie.title}
        onChange={handleMovie}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={movie.description}
        onChange={handleMovie}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movie.imgUrl}
        onChange={handleMovie}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movie.imdbUrl}
        onChange={handleMovie}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movie.imdbId}
        onChange={handleMovie}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={hasInvalidFields}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
