import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';
import { EMPTY_MOVIE } from '../../types/EmptyMovie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);

  const [movie, setMovie] = useState(EMPTY_MOVIE);

  const reset = () => {
    setMovie(EMPTY_MOVIE);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = movie;

    const newMovie: Movie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    onAdd(newMovie);
    setCount(count + 1);

    reset();
  };

  // eslint-disable-next-line max-len
  const urlPattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

  const hasError = !movie.title.trim()
  || (!movie.imdbUrl.trim()
  || !movie.imgUrl.trim().match(urlPattern))
  || (!movie.imdbId.trim()
  || !movie.imdbUrl.trim().match(urlPattern))
  || !movie.imdbId.trim();

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={onSubmit}
    >
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
        required
        isUrl
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movie.imdbUrl}
        onChange={(value) => setMovie({ ...movie, imdbUrl: value })}
        required
        isUrl
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
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
