import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface Props {
  onAdd: (newMovie: Movie) => void;
}

export const NewMovie = ({ onAdd }: Props) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const DEFAULT_MOVIE = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  const [count, setCount] = useState(0);

  const [newMovie, setNewMovie] = useState(DEFAULT_MOVIE);

  const hasInvalidInputs =
    !newMovie.title ||
    !newMovie.imgUrl ||
    !newMovie.imdbUrl ||
    !newMovie.imdbId;

  const handleChange = (field: string, value: string) => {
    setNewMovie(prevState => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (hasInvalidInputs) {
      return;
    }

    onAdd(newMovie);

    setNewMovie(DEFAULT_MOVIE);
    setCount(prev => prev + 1);
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
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
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newMovie.imdbUrl}
        onChange={handleChange}
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
            disabled={hasInvalidInputs}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
