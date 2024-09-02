import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

function validateUrl(value: string) {
  const pattern =
    // eslint-disable-next-line max-len
    /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

  return pattern.test(value);
}

const defaultMovieValues = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

type FormValues = typeof defaultMovieValues;

type Props = {
  onAdd: (newMovie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);

  const [movieValues, setMovieValues] =
    React.useState<FormValues>(defaultMovieValues);

  const hasError =
    !movieValues.title.trim() ||
    !movieValues.imgUrl.trim() ||
    !movieValues.imdbUrl.trim() ||
    !movieValues.imdbId.trim() ||
    !validateUrl(movieValues.imgUrl) ||
    !validateUrl(movieValues.imdbUrl);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMovieValues(prev => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onAdd({ ...movieValues });

    setMovieValues(defaultMovieValues);

    setCount(count + 1);
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={movieValues.title}
        onChange={handleChange}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={movieValues.description}
        onChange={handleChange}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movieValues.imgUrl}
        onChange={handleChange}
        onValidate={validateUrl}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movieValues.imdbUrl}
        onChange={handleChange}
        onValidate={validateUrl}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movieValues.imdbId}
        onChange={handleChange}
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
