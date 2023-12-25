import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

const initialMovie: Movie = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [newMovie, setNewMovie] = useState<Movie>(initialMovie);

  const handelTitleChange = (newValue: string) => {
    setNewMovie(prevNewMovie => ({
      ...prevNewMovie,
      title: newValue,
    }));
  };

  const handelDescriptionChange = (newValue: string) => {
    setNewMovie(prevNewMovie => ({
      ...prevNewMovie,
      description: newValue,
    }));
  };

  const handelImgUrlChange = (newValue: string) => {
    setNewMovie(prevNewMovie => ({
      ...prevNewMovie,
      imgUrl: newValue,
    }));
  };

  const handelImdbUrlChange = (newValue: string) => {
    setNewMovie(prevNewMovie => ({
      ...prevNewMovie,
      imdbUrl: newValue,
    }));
  };

  const handelImdbIdChange = (newValue: string) => {
    setNewMovie(prevNewMovie => ({
      ...prevNewMovie,
      imdbId: newValue,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onAdd(newMovie);
    setNewMovie(initialMovie);
    setCount(prevCount => prevCount + 1);
  };

  const hasError = !newMovie.title || !newMovie.imgUrl
    || !newMovie.imdbUrl || !newMovie.imdbId;

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
        onChange={handelTitleChange}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={newMovie.description}
        onChange={handelDescriptionChange}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={newMovie.imgUrl}
        onChange={handelImgUrlChange}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newMovie.imdbUrl}
        onChange={handelImdbUrlChange}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={newMovie.imdbId}
        onChange={handelImdbIdChange}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={hasError}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
