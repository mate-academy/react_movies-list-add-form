import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);

  const initialState = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  const urlPattern = new RegExp(
    '^((([A-Za-z]{3,9}:(?:\\/\\/)?)' +
      '(?:[-;:&=+$,\\w]+@)?[A-Za-z0-9.-]+' +
      '|(?:www\\.|[-;:&=+$,\\w]+@)[A-Za-z0-9.-]+)' +
      '((?:\\/[+~%/.\\w-_]*)?\\??(?:[-+=&;%@,.\\w_]*)' +
      '#?(?:[,.!/\\\\\\w]*))?)$',
  );

  const validateUrl = (value: string) => {
    if (!urlPattern.test(value)) {
      return 'Invalid URL format';
    }

    return null;
  };

  const [movie, setMovie] = useState(initialState);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setMovie(prevMovie => ({
      ...prevMovie,
      [name]: value,
    }));
  };

  const clearFormFields = () => {
    setMovie(initialState);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onAdd(movie);
    setCount(prevCount => prevCount + 1);
    clearFormFields();
  };

  const isEmpty = (str: string): boolean => !str.trim();

  const isDisabledSubmit = ['title', 'imgUrl', 'imdbUrl', 'imdbId'].some(
    key =>
      isEmpty(movie[key as keyof typeof movie]) ||
      validateUrl(movie.imdbUrl) ||
      validateUrl(movie.imgUrl),
  );

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
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
        validate={validateUrl}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movie.imdbUrl}
        onChange={handleChange}
        validate={validateUrl}
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
            disabled={isDisabledSubmit}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
