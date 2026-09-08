import React, { useState } from 'react';

import { TextField } from '../TextField';

import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

const URL_PATTERN =
  // eslint-disable-next-line max-len
  /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

const DEFAULT_MOVIE: Movie = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

const validateImgUrl = (value: string) =>
  URL_PATTERN.test(value) ? null : 'Invalid URL';

const validateImdbUrl = (value: string) =>
  URL_PATTERN.test(value) ? null : 'Invalid URL';

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [formKey, setFormKey] = useState(0);

  const [movie, setMovie] = useState<Movie>(DEFAULT_MOVIE);

  const isInvalid =
    !movie.title.trim() ||
    !movie.imgUrl.trim() ||
    !movie.imdbUrl.trim() ||
    !movie.imdbId.trim();

  const reset = () => {
    setMovie(DEFAULT_MOVIE);
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    onAdd(movie);

    reset();
    setFormKey(prev => prev + 1);
  };

  const handleChange = (name: keyof Movie, value: string) => {
    setMovie(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form
      className="NewMovie"
      key={formKey}
      onSubmit={event => handleFormSubmit(event)}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={movie.title}
        onChange={handleChange}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={movie.description}
        onChange={handleChange}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movie.imgUrl}
        onChange={handleChange}
        validate={validateImgUrl}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movie.imdbUrl}
        onChange={handleChange}
        validate={validateImdbUrl}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movie.imdbId}
        onChange={handleChange}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isInvalid}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
