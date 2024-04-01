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
  const [newMovie, setNewMovie] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const newMovieTitle = (value: string) => {
    setNewMovie({
      ...newMovie,
      title: value,
    });
  };

  const newMovieDescription = (value: string) => {
    setNewMovie({
      ...newMovie,
      description: value,
    });
  };

  const newMovieImageURL = (value: string) => {
    setNewMovie({
      ...newMovie,
      imgUrl: value,
    });
  };

  const newMovieImdbURL = (value: string) => {
    setNewMovie({
      ...newMovie,
      imdbUrl: value,
    });
  };

  const newMovieImdbId = (value: string) => {
    setNewMovie({
      ...newMovie,
      imdbId: value,
    });
  };

  const fieldsCheck = () => {
    if (
      newMovie.title.trim() &&
      newMovie.imdbId.trim() &&
      newMovie.imdbUrl.trim() &&
      newMovie.imgUrl.trim()
    ) {
      return false;
    }

    return true;
  };

  const reset = () => {
    setNewMovie({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  const submitNewMovie = (event: React.FormEvent) => {
    event.preventDefault();

    onAdd(newMovie);

    reset();

    setCount(count + 1);
  };

  return (
    <form className="NewMovie" key={count} onSubmit={submitNewMovie}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={newMovie.title}
        onChange={newMovieTitle}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={newMovie.description}
        onChange={newMovieDescription}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={newMovie.imgUrl}
        onChange={newMovieImageURL}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newMovie.imdbUrl}
        onChange={newMovieImdbURL}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={newMovie.imdbId}
        onChange={newMovieImdbId}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={fieldsCheck()}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
