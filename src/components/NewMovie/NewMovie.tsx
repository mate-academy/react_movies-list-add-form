import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Movies = {
  onAdd: (movie: Movie) => void;
};

const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/; // eslint-disable-line

export const NewMovie: React.FC<Movies> = ({ onAdd }) => {
  const [count, setCount] = useState(0);

  const [newMovie, setNewMovie] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const reset = () => {
    setNewMovie({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  const requiredFields = newMovie.title.trim()
    && newMovie.imgUrl.trim()
    && newMovie.imdbUrl.trim()
    && newMovie.imdbId.trim();

  function handlergData(
    event: React.ChangeEvent<HTMLInputElement>,
    name: string,
  ): void {
    setNewMovie(prevData => ({
      ...prevData,
      [name]: event.target.value,
    }));
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!requiredFields) {
      return;
    }

    setCount(currentCount => currentCount + 1);

    onAdd({ ...newMovie });

    reset();
  }

  function validateUrl(value: string): boolean {
    return pattern.test(value);
  }

  const isUrlValid = validateUrl(newMovie.imgUrl)
    && validateUrl(newMovie.imdbUrl);

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
        onChange={event => handlergData(event, 'title')}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={newMovie.description}
        onChange={event => handlergData(event, 'description')}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={newMovie.imgUrl}
        onChange={event => handlergData(event, 'imgUrl')}
        validationUrl={value => validateUrl(value)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newMovie.imdbUrl}
        onChange={event => handlergData(event, 'imdbUrl')}
        validationUrl={value => validateUrl(value)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={newMovie.imdbId}
        onChange={event => handlergData(event, 'imdbId')}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!requiredFields || !isUrlValid}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
