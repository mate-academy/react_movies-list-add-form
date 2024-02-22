import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (post: Movie) => void;
};

const initialMovieState = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [movie, setMovie] = useState(initialMovieState);

  const reset = () => {
    setMovie(initialMovieState);
  };

  const canSubmit =
    !movie.title.trim() ||
    !movie.imgUrl.trim() ||
    !movie.imdbUrl.trim() ||
    !movie.imdbId.trim();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setMovie(prevMovie => ({
      ...prevMovie,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onAdd(movie);
    reset();
    setCount(count + 1);
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={movie.title}
        onChange={handleInputChange}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={movie.description}
        onChange={handleInputChange}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movie.imgUrl}
        onChange={handleInputChange}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movie.imdbUrl}
        onChange={handleInputChange}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movie.imdbId}
        onChange={handleInputChange}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={canSubmit}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
