import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

const defaultMovie = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

const URL_VALIDATION_REGEX =
  // eslint-disable-next-line max-len
  /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [movie, setMovie] = useState(defaultMovie);

  const resetForm = () => {
    setMovie(defaultMovie);
    setCount(currentValue => currentValue + 1);
  };

  const isValidLinks =
    URL_VALIDATION_REGEX.test(movie.imgUrl.trim()) &&
    URL_VALIDATION_REGEX.test(movie.imdbUrl.trim());

  const validateForm = () => {
    const isEmptyField =
      !movie.title.trim() ||
      !movie.imdbId.trim() ||
      !movie.imdbUrl.trim() ||
      !movie.imgUrl.trim();

    return !isEmptyField && isValidLinks;
  };

  const handleInputChange = (name: keyof Movie, value: string) => {
    setMovie(prevMovie => ({
      ...prevMovie,
      [name]: value,
    }));
  };

  const handlerOnSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    onAdd(movie);

    resetForm();
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handlerOnSubmit}>
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
        required
        isValidLink={isValidLinks}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movie.imdbUrl}
        onChange={value => handleInputChange('imdbUrl', value)}
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
            disabled={!validateForm()}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
