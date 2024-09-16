import React, { useState } from 'react';
import { Movie } from '../../types/Movie';
import { TextField } from '../TextField';

type Props = {
  onAdd: (newMovie: Movie) => void;
};

const defautValue: Movie = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [newMovie, setNewMovie] = useState(defautValue);
  const isDisabled =
    !newMovie.title ||
    !newMovie.imdbUrl ||
    !newMovie.imgUrl ||
    !newMovie.imdbId;

  const reset = () => {
    setNewMovie(defautValue);
  };

  const handleChange = (name: string, value: string) => {
    setNewMovie(prevMovie => ({
      ...prevMovie,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCount(current => current + 1);
    onAdd(newMovie);
    reset();
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        inputName="title"
        label="Title"
        inputValue={newMovie.title}
        onChange={(name: string, value: string) => handleChange(name, value)}
        required
      />

      <TextField
        inputName="description"
        label="Description"
        inputValue={newMovie.description}
        onChange={(name: string, value: string) => handleChange(name, value)}
      />

      <TextField
        inputName="imgUrl"
        label="Image URL"
        inputValue={newMovie.imgUrl}
        onChange={(name: string, value: string) => handleChange(name, value)}
        required
      />

      <TextField
        inputName="imdbUrl"
        label="Imdb URL"
        inputValue={newMovie.imdbUrl}
        onChange={(name: string, value: string) => handleChange(name, value)}
        required
      />

      <TextField
        inputName="imdbId"
        label="Imdb ID"
        inputValue={newMovie.imdbId}
        onChange={(name: string, value: string) => handleChange(name, value)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isDisabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
