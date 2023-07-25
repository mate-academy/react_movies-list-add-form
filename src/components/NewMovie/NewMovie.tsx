import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void,
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);

  const initialFormFields: Movie = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  const [movie, setMovie] = useState(initialFormFields);

  const validForm = movie.title.trim()
    && movie.imgUrl.trim()
    && movie.imdbUrl.trim()
    && movie.imdbId.trim();

  const increaseCount = (event: React.FormEvent) => {
    event.preventDefault();

    onAdd(movie);
    setCount(currentCount => currentCount + 1);
    setMovie(initialFormFields);
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={increaseCount}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={movie.title}
        onChange={value => setMovie({
          ...movie, title: value,
        })}
        required
      />

      <TextField
        name="description"
        label="description"
        value={movie.description}
        onChange={value => setMovie({
          ...movie, description: value,
        })}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movie.imgUrl}
        onChange={value => setMovie({
          ...movie, imgUrl: value,
        })}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movie.imdbUrl}
        onChange={value => setMovie({
          ...movie, imdbUrl: value,
        })}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movie.imdbId}
        onChange={value => setMovie({
          ...movie, imdbId: value,
        })}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!validForm}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
