import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

const clearDataMovie = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

function isValidURL(str: string): boolean {
  // eslint-disable-next-line
  const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

  if (!pattern.test(str)) {
    return false;
  }

  return true;
}

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [newMovie, setNewMovie] = useState(clearDataMovie);

  const isDisable = !newMovie.title.trim() || !newMovie.imgUrl
    || !newMovie.imdbUrl || !newMovie.imdbId.trim()
    || !isValidURL(newMovie.imgUrl) || !isValidURL(newMovie.imdbUrl);

  const reset = () => {
    setNewMovie(clearDataMovie);
  };

  const handleInputChange = (property: string, newValue: string) => {
    setNewMovie(collectNewMovieField => ({
      ...collectNewMovieField,
      [property]: newValue,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (isDisable) {
      return 0;
    }

    reset();
    setCount(count + 1);

    return onAdd(newMovie);
  };

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
        value={newMovie.title}
        onChange={newValue => handleInputChange('title', newValue)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={newMovie.description}
        onChange={newValue => handleInputChange('description', newValue)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={newMovie.imgUrl}
        onChange={newValue => handleInputChange('imgUrl', newValue)}
        validate={isValidURL}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newMovie.imdbUrl}
        onChange={newValue => handleInputChange('imdbUrl', newValue)}
        validate={isValidURL}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={newMovie.imdbId}
        onChange={newValue => handleInputChange('imdbId', newValue)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isDisable}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
