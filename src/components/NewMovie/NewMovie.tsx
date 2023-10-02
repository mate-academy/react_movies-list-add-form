import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  addMovie: (newMovie: Movie) => void;
};

const initMovie = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

export const NewMovie: React.FC<Props> = ({
  addMovie,
}) => {
  const [count, setCount] = useState(0);
  const [movie, setMovie] = useState<Movie>(initMovie);

  const handleInputChange = (key: string, value: string): void => {
    setMovie((prevInputs) => ({ ...prevInputs, [key]: value }));
  };

  const reset = () => {
    setMovie(initMovie);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    addMovie(movie);
    setCount((prevCount) => prevCount + 1);
    reset();
  };

  const disabled = !movie.title.trim()
  || !movie.imgUrl.trim()
  || !movie.imdbUrl.trim()
  || !movie.imdbId.trim();

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
        onChange={
          (event) => handleInputChange('title', event)
        }
        required
      />

      <TextField
        name="description"
        label="Description"
        value={movie.description}
        onChange={
          (event) => handleInputChange('description', event)
        }
        required
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movie.imgUrl}
        onChange={
          (event) => handleInputChange('imgUrl', event)
        }
        required
      />

      <TextField
        name="imdbUrl"
        value={movie.imdbUrl}
        onChange={
          (event) => handleInputChange('imdbUrl', event)
        }
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movie.imdbId}
        onChange={
          (event) => handleInputChange('imdbId', event)
        }
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
