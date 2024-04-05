import { useState } from 'react';
import { TextField } from '../TextField';
import React from 'react';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (newValue: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count] = useState(0);
  const firstStatusMovie = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };
  const [movie, setMovie] = useState(firstStatusMovie);
  const addMovie = {
    title: movie.title.trim(),
    description: movie.description.trim(),
    imgUrl: movie.imgUrl.trim(),
    imdbUrl: movie.imdbUrl.trim(),
    imdbId: movie.imdbId.trim(),
  };

  const setNewMovie = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMovie(prevMovie => ({
      ...prevMovie,
      [event.target.name]: event.target.value,
    }));
    debugger;
  };

  const isButtonUse =
    !movie.title.trim() ||
    !movie.imgUrl.trim() ||
    !movie.imdbUrl.trim() ||
    !movie.imdbId.trim();

  const handleOnSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (isButtonUse) {
      return;
    }

    onAdd(addMovie);
    setMovie(firstStatusMovie);
  };

  const { title, description, imgUrl, imdbUrl, imdbId } = movie;

  return (
    <form className="NewMovie" key={count} onSubmit={handleOnSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={setNewMovie}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={setNewMovie}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={setNewMovie}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={setNewMovie}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={setNewMovie}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isButtonUse}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
