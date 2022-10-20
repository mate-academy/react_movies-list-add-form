import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void
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

  const handelOnChnage = (key: keyof Movie, value: string) => {
    setNewMovie(prevState => {
      const updatedState = { ...prevState };

      updatedState[key] = value;

      return updatedState;
    });
  };

  const isDisableAddBtn = () => {
    const {
      title,
      imgUrl,
      imdbUrl,
      imdbId,
    } = newMovie;

    if (title && imgUrl && imdbUrl && imdbId) {
      return false;
    }

    return true;
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={(event) => {
        event.preventDefault();
        setCount(prevCount => prevCount + 1);
        onAdd(newMovie);
        setNewMovie({
          title: '',
          description: '',
          imgUrl: '',
          imdbUrl: '',
          imdbId: '',
        });
      }}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={newMovie.title}
        onChange={(newValue) => handelOnChnage('title', newValue)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={newMovie.description}
        onChange={(newValue) => handelOnChnage('description', newValue)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={newMovie.imgUrl}
        onChange={(newValue) => handelOnChnage('imgUrl', newValue)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newMovie.imdbUrl}
        onChange={(newValue) => handelOnChnage('imdbUrl', newValue)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={newMovie.imdbId}
        onChange={(newValue) => handelOnChnage('imdbId', newValue)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isDisableAddBtn()}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
