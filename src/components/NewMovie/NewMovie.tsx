import React, { useState } from 'react';
// import classNames from 'classnames';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (newMovie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);

  const initMovie = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  const [movie, setMovie] = useState(initMovie);

  const reset = () => {
    setMovie(initMovie);
  };

  // eslint-disable-next-line max-len
  const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

  const hasError = !movie.title
  || !pattern.test(movie.imgUrl)
  || !pattern.test(movie.imdbUrl)
  || !movie.imdbId;

  const validate = (value: string) => pattern.test(value);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newMovie: Movie = {
      title: movie.title,
      description: movie.description,
      imgUrl: movie.imgUrl.trim(),
      imdbUrl: movie.imdbUrl.trim(),
      imdbId: movie.imdbId.trim(),
    };

    onAdd(newMovie);
    setCount((newCount) => newCount + 1);
    reset();
  };

  return (
    <form className="NewMovie" onSubmit={onSubmit} key={count}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={movie.title}
        onChange={(value) => setMovie({ ...movie, title: value })}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={movie.description}
        onChange={(value) => setMovie({ ...movie, description: value })}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movie.imgUrl}
        onChange={(value) => setMovie({ ...movie, imgUrl: value })}
        validate={validate}
        required
      />

      <TextField
        name="imdbUrl"
        label="IMDb URL"
        value={movie.imdbUrl}
        onChange={(value) => setMovie({ ...movie, imdbUrl: value })}
        validate={validate}
        required
      />

      <TextField
        name="imdbId"
        label="IMDb ID"
        value={movie.imdbId}
        onChange={(value) => setMovie({ ...movie, imdbId: value })}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={hasError}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
