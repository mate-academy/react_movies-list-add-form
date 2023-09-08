import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);

  const [currentMovie, setCurrentMovie] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const resetFormFields = () => {
    setCount(prevCount => prevCount + 1);
    setCurrentMovie({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    resetFormFields();

    onAdd({
      title: currentMovie.title,
      description: currentMovie.description,
      imgUrl: currentMovie.imgUrl,
      imdbUrl: currentMovie.imdbUrl,
      imdbId: currentMovie.imdbId,
    });
  };

  const setMovieFieldState = (name: string, value: string) => {
    setCurrentMovie((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const isAddButtonDisabled = !currentMovie.title.trim()
    || !currentMovie.imgUrl.trim()
    || !currentMovie.imdbUrl.trim()
    || !currentMovie.imdbId.trim();

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
        value={currentMovie.title}
        onChange={(event) => setMovieFieldState('title', event)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={currentMovie.description}
        onChange={(event) => setMovieFieldState('description', event)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={currentMovie.imgUrl}
        onChange={(event) => setMovieFieldState('imgUrl', event)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={currentMovie.imdbUrl}
        onChange={(event) => setMovieFieldState('imdbUrl', event)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={currentMovie.imdbId}
        onChange={(event) => setMovieFieldState('imdbId', event)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isAddButtonDisabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
