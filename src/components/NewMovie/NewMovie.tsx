import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type HandleInput = (name: string, value: string) => void;
type HandleForm = (event: React.FormEvent<HTMLFormElement>) => void;

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const emptyMovie: Movie = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  const [movie, setMovie] = useState<Movie>({...emptyMovie});

  const [count, setCount] = useState(0);

  const isValidUrl = (value: string) => {
    if (value === '') {
      return true;
    }

    const pattern = new RegExp(
      '^((([A-Za-z]{3,9}:(?:\\/\\/)?)(?:[-;:&=+$,\\w]+@)?[A-Za-z0-9.-]+' +
        '|(?:www\\.|[-;:&=+$,\\w]+@)[A-Za-z0-9.-]+)' +
        '((?:\\/[+~%/.\\w-_]*)?\\??(?:[-+=&;%@,.\\w_]*)' +
        '#?(?:[,.!/\\\\\\w]*))?)$',
    );

    return pattern.test(value);
  };

  const handlInput: HandleInput = (name, value) => {
    setMovie(currentValues => ({
      ...currentValues,
      [name]: value,
    }));
  };

  const error: boolean =
    movie.imdbId.trim() === '' ||
    movie.imdbUrl.trim() === '' ||
    movie.imgUrl.trim() === '' ||
    movie.title.trim() === '' ||
    !isValidUrl(movie.imdbUrl) ||
    !isValidUrl(movie.imgUrl);

  const handleSubmit: HandleForm = event => {
    event.preventDefault();

    if (error) {
      return;
    }

    setCount(currentCount => currentCount + 1);

    onAdd(movie);

    setMovie({...emptyMovie});
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={movie.title}
        onChange={(value: string) => handlInput('title', value)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={movie.description}
        onChange={(value: string) => handlInput('description', value)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movie.imgUrl}
        urlValidate={isValidUrl}
        onChange={(value: string) => handlInput('imgUrl', value)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movie.imdbUrl}
        urlValidate={isValidUrl}
        onChange={(value: string) => handlInput('imdbUrl', value)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movie.imdbId}
        onChange={(value: string) => handlInput('imdbId', value)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={error}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
