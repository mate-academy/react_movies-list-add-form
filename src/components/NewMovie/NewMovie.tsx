import { useState } from 'react';

import { TextField } from '../TextField';

import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

type MoviesState = {
  title: string;
  description: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
};

const DEFAULT_MOVIE = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [moviesState, setMoviesState] = useState<MoviesState>(DEFAULT_MOVIE);

  const reset = () => {
    setMoviesState(DEFAULT_MOVIE);
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setMoviesState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const hasEmptyFields = Object.keys(moviesState)
    .filter(key => key !== 'description')
    .some(key => {
      const value = moviesState[key as keyof MoviesState];

      return !value?.trim();
    });

  const onSubmit = (e: React.FormEvent) => {
    setCount(oldCount => oldCount + 1);
    e.preventDefault();
    reset();
    onAdd(moviesState);
  };

  return (
    <form className="NewMovie" key={count} onSubmit={onSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={moviesState.title}
        onChange={handleOnChange}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={moviesState.description}
        onChange={handleOnChange}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={moviesState.imgUrl}
        onChange={handleOnChange}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={moviesState.imdbUrl}
        onChange={handleOnChange}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={moviesState.imdbId}
        onChange={handleOnChange}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={hasEmptyFields}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
