import React, { useState } from 'react';
import { Movie } from '../../types/Movie';
import { TextField } from '../TextField';

type Props = {
  onAdd?: (movie: Movie) => void;
};

const initialMovie: Movie = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

const URL_PATTERN = new RegExp(
  '^((([A-Za-z]{3,9}:(?:\\/\\/)?)(?:[-;:&=+$,\\w]+@)?[A-Za-z0-9.-]+'
    + '|(?:www\\.|[-;:&=+$,\\w]+@)[A-Za-z0-9.-]+)((?:\\/[+~%/.\\w-_]*)?'
    + '\\??(?:[-+=&;%@,.\\w_]*)#?(?:[,.!/\\\\\\w]*))?)$',
);

const isValidUrl = (value: string) => URL_PATTERN.test(value.trim());

export const NewMovie: React.FC<Props> = ({ onAdd = () => {} }) => {
  const [movie, setMovie] = useState(initialMovie);
  const [count, setCount] = useState(0);

  const updateField =
    (field: keyof typeof initialMovie) => (value: string) => {
      setMovie(currentMovie => ({
        ...currentMovie,
        [field]: value,
      }));
    };

  const requiredFields: Array<keyof typeof initialMovie> = [
    'title',
    'imgUrl',
    'imdbUrl',
    'imdbId',
  ];

  const isFormValid =
    requiredFields.every(field => movie[field].trim() !== '') &&
    isValidUrl(movie.imgUrl) &&
    isValidUrl(movie.imdbUrl);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isFormValid) {
      return;
    }

    const newMovie: Movie = {
      title: movie.title.trim(),
      description: movie.description.trim(),
      imgUrl: movie.imgUrl.trim(),
      imdbUrl: movie.imdbUrl.trim(),
      imdbId: movie.imdbId.trim(),
    };

    onAdd(newMovie);
    setMovie(initialMovie);
    setCount(currentCount => currentCount + 1);
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={movie.title}
        onChange={updateField('title')}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={movie.description}
        onChange={updateField('description')}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movie.imgUrl}
        onChange={updateField('imgUrl')}
        required
        validate={value => {
          const trimmedValue = value.trim();

          if (!trimmedValue) {
            return 'Image URL is required';
          }

          if (!isValidUrl(trimmedValue)) {
            return 'Image URL is invalid';
          }

          return true;
        }}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movie.imdbUrl}
        onChange={updateField('imdbUrl')}
        required
        validate={value => {
          const trimmedValue = value.trim();

          if (!trimmedValue) {
            return 'Imdb URL is required';
          }

          if (!isValidUrl(trimmedValue)) {
            return 'Imdb URL is invalid';
          }

          return true;
        }}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movie.imdbId}
        onChange={updateField('imdbId')}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isFormValid}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
