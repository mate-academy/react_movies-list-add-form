import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [imgUrlError, setImgUrlError] = useState(false);
  const [imdbUrlError, setImdbUrlError] = useState(false);
  const [newMovie, setNewMovie] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setNewMovie((prevMovie) => ({ ...prevMovie, [name]: value.trimStart() }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (imgUrlError || imdbUrlError) {
      return;
    }

    const clear = () => {
      setNewMovie({
        title: '',
        description: '',
        imgUrl: '',
        imdbUrl: '',
        imdbId: '',
      });
      setImdbUrlError(false);
      setImgUrlError(false);
    };

    onAdd(newMovie);
    clear();
    setCount(prevCount => prevCount + 1);
  };

  const isEnabled = newMovie.title && newMovie.imgUrl
    && newMovie.imdbUrl && newMovie.imdbId;

  // eslint-disable-next-line
  const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

  const isValidUrl = (url: string) => {
    return !pattern.test(url);
  };

  const handleUrlValidation = () => {
    setImgUrlError(isValidUrl(newMovie.imgUrl));
    setImdbUrlError(isValidUrl(newMovie.imdbUrl));
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
        onChange={handleChange}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={newMovie.description}
        onChange={handleChange}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={newMovie.imgUrl}
        onChange={handleChange}
        hasUrlError={imgUrlError}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newMovie.imdbUrl}
        onChange={handleChange}
        hasUrlError={imdbUrlError}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={newMovie.imdbId}
        onChange={handleChange}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isEnabled}
            onClick={handleUrlValidation}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
