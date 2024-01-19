import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

export interface NewMovieProps {
  onAdd: (movie: Movie) => void;
}

export const NewMovie: React.FC<NewMovieProps> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const defaultMovie = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  const [count, setCount] = useState(0);
  const [newMovie, setNewMovie] = useState(defaultMovie);

  const ableToAddMovie = newMovie.title.trim()
    && newMovie.imgUrl.trim() && newMovie.imdbUrl.trim()
    && newMovie.imdbId.trim();

  const submitAddMovie = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setNewMovie(defaultMovie);

    setCount((currentCount) => currentCount + 1);

    onAdd(newMovie);
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={submitAddMovie}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={newMovie.title}
        onChange={(event) => {
          setNewMovie(currentMovie => {
            return {
              ...currentMovie,
              title: event,
            };
          });
        }}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={newMovie.description}
        onChange={(event) => {
          setNewMovie(currentMovie => {
            return {
              ...currentMovie,
              description: event,
            };
          });
        }}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={newMovie.imgUrl}
        onChange={(event) => {
          setNewMovie(currentMovie => {
            return {
              ...currentMovie,
              imgUrl: event,
            };
          });
        }}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newMovie.imdbUrl}
        onChange={(event) => {
          setNewMovie(currentMovie => {
            return {
              ...currentMovie,
              imdbUrl: event,
            };
          });
        }}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={newMovie.imdbId}
        onChange={(event) => {
          setNewMovie(currentMovie => {
            return {
              ...currentMovie,
              imdbId: event,
            };
          });
        }}
        required
      />

      <div className="field is-grouped">
        <div className="control">

          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!ableToAddMovie}
          >
            Add
          </button>

        </div>
      </div>
    </form>
  );
};
