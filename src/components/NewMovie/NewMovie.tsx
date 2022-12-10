import React, { useState } from 'react';
import { Movie } from '../../types/Movie';
import { TextField } from '../TextField';

// eslint-disable-next-line max-len
const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

type Props = {
  onAdd: (movie: Movie) => void
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const clearForm = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };
  const [count, setCount] = useState(0);
  const [movie, setMovie] = useState(clearForm);

  const {
    title,
    description,
    imgUrl,
    imdbUrl,
    imdbId,
  } = movie;

  const isValidUrl = (url: string):boolean => pattern.test(url.trim());

  const disabledButton
  = title
  && isValidUrl(imgUrl)
  && isValidUrl(imdbUrl)
  && imdbId;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setMovie(currMovie => ({
      ...currMovie,
      [name]: value.trimStart(),
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onAdd(movie);

    setCount(currCount => currCount + 1);
    setMovie(clearForm);
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
        value={title}
        onChange={handleChange}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={handleChange}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={handleChange}
        isValidUrl={isValidUrl}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={handleChange}
        isValidUrl={isValidUrl}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={handleChange}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!disabledButton}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
