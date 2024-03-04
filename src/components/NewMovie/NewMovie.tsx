import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

const initialMovieState = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count] = useState(0);
  const [movie, setMovie] = useState(initialMovieState);

  const handlerInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setMovie(prevInputs => ({ ...prevInputs, [name]: value }));
  };

  const isValidForm =
    !movie.title.trim() ||
    !movie.imgUrl.trim() ||
    !movie.imdbUrl.trim() ||
    !movie.imdbId.trim();

  const reset = () => {
    setMovie(initialMovieState);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (isValidForm) {
      return;
    }

    onAdd(movie);

    reset();
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={movie.title}
        onChange={handlerInputChange}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={movie.description}
        onChange={handlerInputChange}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movie.imgUrl}
        onChange={handlerInputChange}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movie.imdbUrl}
        onChange={handlerInputChange}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movie.imdbId}
        onChange={handlerInputChange}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isValidForm}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
