import React, { useState } from 'react';
import { TextField } from '../TextField';

import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [isError, setError] = useState({
    title: true,
    description: false,
    imgUrl: true,
    imdbUrl: true,
    imdbId: true,
  });
  const [newMovie, setNewMovie] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const handleError = (name: string, error: boolean) => {
    setError((prevError) => ({
      ...prevError,
      [name]: error,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onAdd(newMovie);
    setCount((prevCount) => prevCount + 1);
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
        onChange={(newValue) => {
          setNewMovie((prevMovie) => ({
            ...prevMovie,
            title: newValue,
          }));
        }}
        handleError={handleError}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={newMovie.description}
        onChange={(newValue) => {
          setNewMovie((prevMovie) => ({
            ...prevMovie,
            description: newValue,
          }));
        }}
        handleError={handleError}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        required
        value={newMovie.imgUrl}
        onChange={(newValue) => {
          setNewMovie((prevMovie) => ({
            ...prevMovie,
            imgUrl: newValue,
          }));
        }}
        handleError={handleError}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        required
        value={newMovie.imdbUrl}
        onChange={(newValue) => {
          setNewMovie((prevMovie) => ({
            ...prevMovie,
            imdbUrl: newValue,
          }));
        }}
        handleError={handleError}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        required
        value={newMovie.imdbId}
        onChange={(newValue) => {
          setNewMovie((prevMovie) => ({
            ...prevMovie,
            imdbId: newValue,
          }));
        }}
        handleError={handleError}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={Object.values(isError).some(error => error)}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
