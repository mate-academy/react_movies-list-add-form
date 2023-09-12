import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

const DEFAULT_MOVIE_DATA = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

type Props = {
  onAdd: (movie: Movie) => void,
};

export const NewMovie: React.FC<Props> = ({ onAdd = () => {} }) => {
  const [count, setCount] = useState(0);

  const [newMovie, setNewMovie] = useState(DEFAULT_MOVIE_DATA);

  const resetFormFields = () => {
    setNewMovie(DEFAULT_MOVIE_DATA);
  };

  const isDisabled = !(
    newMovie.title
      && newMovie.imgUrl
      && newMovie.imdbUrl
      && newMovie.imdbId
  );

  const handleSubmit = (event: React.FormEvent<Element>) => {
    event.preventDefault();

    onAdd(newMovie);

    setCount(prevstate => prevstate + 1);

    resetFormFields();
  };

  const handlerOnChange = (value: Partial<Movie>) => {
    setNewMovie(prev => ({
      ...prev, ...value,
    }));
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
        onChange={(value) => handlerOnChange({ title: value })}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={newMovie.description}
        onChange={(value) => handlerOnChange({ description: value })}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={newMovie.imgUrl}
        onChange={(value) => handlerOnChange({ imgUrl: value })}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newMovie.imdbUrl}
        onChange={(value) => handlerOnChange({ imdbUrl: value })}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={newMovie.imdbId}
        onChange={(value) => handlerOnChange({ imdbId: value })}
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
