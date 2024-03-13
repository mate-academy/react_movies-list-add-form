import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';
// import { event } from 'cypress/types/jquery';

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
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [movie, setMovie] = useState(initialMovieState);
  const [count, setCount] = useState(0);

  const reset = () => {
    setMovie(initialMovieState);
    setCount(c => c + 1);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onAdd(movie);

    reset();
  };

  const isFormValid = () => {
    return (
      movie.title.trim() &&
      movie.imgUrl.trim() &&
      movie.imdbUrl.trim() &&
      movie.imdbId.trim()
    );
  };

  const handleInputChange = (name: string, value: string) => {
    setMovie(prevMovie => ({ ...prevMovie, [name]: value }));
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
            disabled={!isFormValid()}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
