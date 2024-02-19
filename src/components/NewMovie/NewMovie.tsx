import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  'onAdd': (movie: Movie) => void;
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

  const hasError = () => {
    if (
      newMovie.title
      && newMovie.imgUrl
      && newMovie.imdbUrl
      && newMovie.imdbId) {
      return false;
    }

    return true;
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const movie = {
      title: newMovie.title,
      description: newMovie.description,
      imgUrl: newMovie.imgUrl,
      imdbUrl: newMovie.imdbUrl,
      imdbId: newMovie.imdbId,
    };

    onAdd(movie);
    setCount(count + 1);

    setNewMovie({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = event.target;

    setNewMovie((prevMovie) => ({ ...prevMovie, [name]: value.trim() }));
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={(event) => onSubmit(event)}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={newMovie.title}
        onChange={(event) => {
          handleChange(event);
        }}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={newMovie.description}
        onChange={(event) => handleChange(event)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={newMovie.imgUrl}
        onChange={(event) => handleChange(event)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newMovie.imdbUrl}
        onChange={(event) => handleChange(event)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={newMovie.imdbId}
        onChange={(event) => handleChange(event)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={hasError()}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
