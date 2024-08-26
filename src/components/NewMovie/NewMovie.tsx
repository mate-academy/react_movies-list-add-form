import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';
interface Props {
  onAdd: (movie: Movie) => void;
}

const emptyMovieFields: Movie = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [movieData, setMovieData] = useState(emptyMovieFields);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setMovieData(currentData => ({
      ...currentData,
      [name]: value,
    }));
  };

  const buttonDisabled =
    !movieData.title.trim() ||
    !movieData.imgUrl.trim() ||
    !movieData.imdbUrl.trim() ||
    !movieData.imdbId.trim();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      movieData.title &&
      movieData.imgUrl &&
      movieData.imdbUrl &&
      movieData.imdbId
    ) {
      onAdd(movieData);
    }

    setMovieData(emptyMovieFields);
    setCount(current => current + 1);
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={movieData.title}
        onChange={handleChange}
        required
      />
      <TextField
        name="description"
        label="Description"
        value={movieData.description}
        onChange={handleChange}
      />
      <TextField
        name="imgUrl"
        label="Image URL"
        value={movieData.imgUrl}
        onChange={handleChange}
        required
      />
      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movieData.imdbUrl}
        onChange={handleChange}
        required
      />
      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movieData.imdbId}
        onChange={handleChange}
        required
      />
      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={buttonDisabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
