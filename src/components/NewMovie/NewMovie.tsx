import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';
import { pattern } from '../../utils/pattern';

type Props = {
  onAdd: (newMovie: Movie) => void
};

const initialMovie = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [movie, setMovie] = useState<Movie>(initialMovie);

  const {
    title,
    description,
    imgUrl,
    imdbUrl,
    imdbId,
  } = movie;

  const isEmptyField = !title.trim()
    || !imdbId.trim()
    || !imdbUrl.trim()
    || !imgUrl.trim();

  const isValidURL = pattern.test(imdbUrl) && pattern.test(imgUrl);
  const isAddButtonDisabled = isEmptyField || !isValidURL;

  const handleChangeFieldValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setMovie(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onAdd(movie);
    setCount(prevVal => prevVal + 1);
    setMovie(initialMovie);
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={handleFormSubmit}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={handleChangeFieldValue}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={handleChangeFieldValue}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={handleChangeFieldValue}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={handleChangeFieldValue}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={handleChangeFieldValue}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isAddButtonDisabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
