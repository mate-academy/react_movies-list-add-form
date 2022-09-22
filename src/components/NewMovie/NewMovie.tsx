import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void
};

export const NewMovie = ({ onAdd } : Props) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [movie, setMovie] = useState<Movie>({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });
  const isDisabled = !movie.title || !movie.imgUrl
    || !movie.imdbUrl || !movie.imdbId;

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onAdd(movie);
    setCount(count + 1);
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={(event) => onSubmitHandler(event)}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={movie.title}
        onChange={(event) => {
          setMovie((prevMovie) => ({ ...prevMovie, title: event }));
        }}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={movie.description}
        onChange={(event) => {
          setMovie((prevMovie) => ({ ...prevMovie, description: event }));
        }}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movie.imgUrl}
        onChange={(event) => {
          setMovie((prevMovie) => ({ ...prevMovie, imgUrl: event }));
        }}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movie.imdbUrl}
        onChange={(event) => {
          setMovie((prevMovie) => ({ ...prevMovie, imdbUrl: event }));
        }}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movie.imdbId}
        onChange={(event) => {
          setMovie((prevMovie) => ({ ...prevMovie, imdbId: event }));
        }}
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
