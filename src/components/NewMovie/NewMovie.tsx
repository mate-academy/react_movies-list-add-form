import React, { FormEvent, useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface Props {
  onAdd: (movie: Movie) => void;
}

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, increaseCount] = useState(0);
  const [newMovie, setMovie] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const {
    title,
    description,
    imgUrl,
    imdbUrl,
    imdbId,
  } = newMovie;

  const addMovieField = (key: string, value: string) => {
    setMovie({
      ...newMovie,
      [key]: value,
    });
  };

  // eslint-disable-next-line max-len
  const urlPattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;
  const validateUrl = (url: string): boolean => {
    return urlPattern.test(url);
  };

  const allFieldsAreValid = title && imdbId
      && validateUrl(imdbUrl) && validateUrl(imgUrl);
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    increaseCount(count + 1);
    onAdd(newMovie);
    setMovie({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={(event) => handleSubmit(event)}
    >
      <h2 className="title">Add a movie</h2>
      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={addMovieField}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={addMovieField}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={addMovieField}
        required
        validated={validateUrl}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={addMovieField}
        required
        validated={validateUrl}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={addMovieField}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!allFieldsAreValid}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
