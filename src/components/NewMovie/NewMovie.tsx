import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void,
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [newMovie, setNewMovie] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const isInputError = !newMovie.title
    || !newMovie.imgUrl
    || !newMovie.imdbUrl
    || !newMovie.imdbId;

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setCount(currentCount => (currentCount + 1));

    onAdd(newMovie);

    setNewMovie({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  }

  const handleTitle = (curentValue: string) => setNewMovie(
    { ...newMovie, ...{ title: curentValue } },
  );

  const handleDescription = (curentValue: string) => setNewMovie(
    { ...newMovie, ...{ description: curentValue } },
  );

  const handleImgUrl = (curentValue: string) => setNewMovie(
    { ...newMovie, ...{ imgUrl: curentValue } },
  );

  const handleImdbUrl = (curentValue: string) => setNewMovie(
    { ...newMovie, ...{ imdbUrl: curentValue } },
  );

  const handleImdbId = (curentValue: string) => setNewMovie(
    { ...newMovie, ...{ imdbId: curentValue } },
  );

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
        onChange={handleTitle}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={newMovie.description}
        onChange={handleDescription}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={newMovie.imgUrl}
        onChange={handleImgUrl}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newMovie.imdbUrl}
        onChange={handleImdbUrl}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={newMovie.imdbId}
        onChange={handleImdbId}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isInputError}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
