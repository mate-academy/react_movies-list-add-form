import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void,
};

export const NewMovie: React.FC<Props> = ({ onAdd = () => {} }) => {
  const [count, setCount] = useState(0);

  function createNewMovie() {
    return {
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    };
  }

  const [newMovie, setNewMovie] = useState(createNewMovie());

  const resetFormFields = () => {
    setNewMovie(createNewMovie());
  };

  const isDisabled = () => {
    return !(
      newMovie.title
      && newMovie.imgUrl
      && newMovie.imdbUrl
      && newMovie.imdbId
    );
  };

  const handleSubmit = (event: React.FormEvent<Element>) => {
    event.preventDefault();

    onAdd(newMovie);

    setCount(prevstate => prevstate + 1);

    resetFormFields();
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
        onChange={(title) => {
          setNewMovie({ ...newMovie, title });
        }}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={newMovie.description}
        onChange={(description) => {
          setNewMovie({ ...newMovie, description });
        }}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={newMovie.imgUrl}
        onChange={(imgUrl) => {
          setNewMovie({ ...newMovie, imgUrl });
        }}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newMovie.imdbUrl}
        onChange={(imdbUrl) => {
          setNewMovie({ ...newMovie, imdbUrl });
        }}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={newMovie.imdbId}
        onChange={(imdbId) => {
          setNewMovie({ ...newMovie, imdbId });
        }}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isDisabled()}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
