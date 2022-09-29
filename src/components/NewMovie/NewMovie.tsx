import React, { useState } from 'react';
import { Movie } from '../../types/Movie';
import { TextField } from '../TextField';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const movieValues = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };
  const [count, setCount] = useState(0);
  const [newMovie, setNewMovie] = useState(movieValues);

  const {
    title,
    description,
    imgUrl,
    imdbUrl,
    imdbId,
  } = newMovie;

  const handleChange = ({ value, name }: HTMLInputElement) => {
    setNewMovie(movie => ({
      ...movie,
      [name]: value,
    }));
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    onAdd(newMovie);
    setNewMovie(movieValues);
    setCount(counter => counter + 1);
  };

  const disabled = !title.trim()
  || !imgUrl.trim()
  || !imdbUrl.trim()
  || !imdbId.trim();

  return (
    <form className="NewMovie" key={count}>
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
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={handleChange}
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
            disabled={disabled}
            onClick={handleClick}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
