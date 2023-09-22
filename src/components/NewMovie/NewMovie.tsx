import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

const baseFormData = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};
interface Props {
  onAdd: (movie: Movie) => void;
}

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [newMovie, setNewMovie] = useState(baseFormData);
  const {
    title, description, imgUrl, imdbUrl, imdbId,
  } = newMovie;

  const [count, setCount] = useState(0);

  const isAnyFieldEmpty =
    !title.trim()
    || !imgUrl.trim()
    || !imdbUrl.trim()
    || !imdbId.trim();

  const isUrlValid = isValidUrl(imgUrl) === undefined && isValidUrl(imdbUrl) === undefined;

  const handleMovieFieldChange = (name: string, value: string) => {
    setNewMovie((prevMovie) => ({ ...prevMovie, [name]: value }));
  };

  function isValidUrl(url: string) {
    if (!url) {
      return undefined;
    }

    const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

    if (!pattern.test(url)) {
      return "Error URL";
    }

    return undefined;
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (isAnyFieldEmpty) {
      return;
    }

    onAdd(newMovie);
    setCount(count + 1);
    setNewMovie(baseFormData);
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={handleSubmit}
    >
      <h2 className="title">
        Add a movie
      </h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={value => handleMovieFieldChange('title', value)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={value => handleMovieFieldChange('description', value)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={value => handleMovieFieldChange('imgUrl', value)}
        validateUrl={isValidUrl}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={value => handleMovieFieldChange('imdbUrl', value)}
        validateUrl={isValidUrl}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={value => handleMovieFieldChange('imdbId', value)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isAnyFieldEmpty || !isUrlValid}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
