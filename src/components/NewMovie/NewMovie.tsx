import React, { useState } from 'react';
import { Movie } from '../../types/Movie';
import { MovieError } from '../../types/MovieError';
import { TextField } from '../TextField';

type Props = {
  onAdd: (movie: Movie) => void;
};

const defaultMovie: Movie = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

const defaultMovieError: MovieError = {
  title: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

export const urlRegex =
  // eslint-disable-next-line max-len
  /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [movie, setMovie] = useState(defaultMovie);
  const [movieError, setMovieError] = useState(defaultMovieError);

  const hasFormErrors =
    !movie.title ||
    !movie.imgUrl ||
    !movie.imdbUrl ||
    !movie.imdbId ||
    !urlRegex.test(movie.imgUrl) ||
    !urlRegex.test(movie.imdbUrl);

  const setMovieErrorFn = (field: keyof MovieError, error: string) => {
    setMovieError(prev => {
      const newMovieError = { ...prev };

      newMovieError[field] = error;

      return newMovieError;
    });
  };

  const handleOnChange = (field: keyof Movie, newValue: string): void => {
    setMovie(prev => {
      const newMovie = { ...prev };

      newMovie[field] = newValue;

      return newMovie;
    });

    if (
      Object.keys(movieError).includes(field) &&
      movieError[field as keyof MovieError]
    ) {
      setMovieErrorFn(field as keyof MovieError, '');
    }
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!hasFormErrors) {
      setCount(prev => prev + 1);
      onAdd(movie);
      setMovie(defaultMovie);
      setMovieError(defaultMovieError);
    }
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleFormSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={movie.title}
        onChange={handleOnChange}
        setError={error => setMovieErrorFn('title', error)}
        required
        error={movieError.title}
      />

      <TextField
        name="description"
        label="Description"
        value={movie.description}
        onChange={handleOnChange}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movie.imgUrl}
        required
        setError={error => setMovieErrorFn('imgUrl', error)}
        onChange={handleOnChange}
        error={movieError.imgUrl}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movie.imdbUrl}
        required
        onChange={handleOnChange}
        setError={error => setMovieErrorFn('imdbUrl', error)}
        error={movieError.imdbUrl}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movie.imdbId}
        required
        onChange={handleOnChange}
        setError={error => setMovieErrorFn('imdbId', error)}
        error={movieError.imdbId}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={hasFormErrors}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
