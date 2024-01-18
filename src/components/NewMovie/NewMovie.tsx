import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void,
};

const defaultMovie = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

function isValidURL(str: string): boolean {
  // eslint-disable-next-line max-len
  const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

  if (!pattern.test(str)) {
    return false;
  }

  return true;
}

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [movie, setMovie] = useState(defaultMovie);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onAdd(movie);
    setCount(count + 1);
    setMovie(defaultMovie);
  };

  const handleInputChange = (key: string, value: string) => {
    setMovie(prevInputs => ({
      ...prevInputs,
      [key]: value,
    }));
  };

  const hasError = !movie.title.trim()
  || !movie.imgUrl.trim() || !movie.imdbUrl.trim() || !movie.imdbId.trim()
  || !isValidURL(movie.imgUrl) || !isValidURL(movie.imdbUrl);

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
        onChange={value => handleInputChange('title', value)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={movie.description}
        onChange={value => handleInputChange('description', value)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movie.imgUrl}
        onChange={value => handleInputChange('imgUrl', value)}
        validate={isValidURL}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movie.imdbUrl}
        onChange={value => handleInputChange('imdbUrl', value)}
        validate={isValidURL}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movie.imdbId}
        onChange={value => handleInputChange('imdbId', value)}
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
