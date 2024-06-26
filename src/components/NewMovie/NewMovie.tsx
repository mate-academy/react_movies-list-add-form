import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);

  const [movie, setMovie] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const [hasError, setHasError] = useState(false);

  // eslint-disable-next-line
  const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

  const reset = () => {
    setMovie({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  const heandleAdd = (event: React.FormEvent) => {
    event.preventDefault();

    setHasError(!movie.title);
    setHasError(!movie.imgUrl);
    setHasError(!movie.imdbUrl);
    setHasError(!movie.imdbId);

    if (
      !movie.title ||
      !pattern.test(movie.imgUrl) ||
      !pattern.test(movie.imdbUrl) ||
      !movie.imdbId
    ) {
      return;
    }

    onAdd(movie);

    setCount(currentCount => currentCount + 1);

    reset();
  };

  function heandleChange(value: string, name: string) {
    setMovie(current => ({
      ...current,
      [name]: value.trimStart(),
    }));
  }

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={heandleAdd}
      onReset={reset}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={movie.title}
        onChange={heandleChange}
        hasError={hasError}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={movie.description}
        onChange={heandleChange}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movie.imgUrl}
        pattern={pattern}
        onChange={heandleChange}
        hasError={hasError}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movie.imdbUrl}
        pattern={pattern}
        onChange={heandleChange}
        hasError={hasError}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movie.imdbId}
        onChange={heandleChange}
        hasError={hasError}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={
              !movie.title ||
              !pattern.test(movie.imgUrl) ||
              !pattern.test(movie.imdbUrl) ||
              !movie.imdbId
            }
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
