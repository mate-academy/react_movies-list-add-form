import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';
import { NewMovieProps } from '../../types/NewMovieProps';
import React from 'react';

const EMPTY_MOVIE: Movie = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

export const NewMovie: React.FC<NewMovieProps> = ({ onAdd }) => {
  const [newMovie, setNewMovie] = useState({ ...EMPTY_MOVIE });
  const [count, setCount] = useState(0);

  const canSubmit = Object.entries(newMovie).every(field => {
    if (field[0] === 'description') {
      return true;
    }

    return field[1].trim() !== '';
  });

  const resetFormFields = () => {
    setNewMovie({ ...EMPTY_MOVIE });
  };

  const addNewMovie = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setCount(count + 1);
    onAdd(newMovie);
    resetFormFields();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setNewMovie((currentMovies: Movie) => ({
      ...currentMovies,
      [name]: value,
    }));
  };

  return (
    <form className="NewMovie" key={count} onSubmit={addNewMovie}>
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
        required
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
            disabled={!canSubmit}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
