import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

const DEFAULT_VALUE = {
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
  const [count, setCount] = useState(0);

  const [newMovie, setNewMovie] = useState<Movie>(DEFAULT_VALUE);

  const disabled = !(
    newMovie.title.trim().length &&
    newMovie.imgUrl.trim().length &&
    newMovie.imdbUrl.trim().length &&
    newMovie.imdbId.trim().length
  );

  const reset = () => {
    setNewMovie(DEFAULT_VALUE);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onAdd(newMovie);
    reset();

    setCount(current => current + 1);
  };

  const handleAddValue = (type: keyof Movie, value: string) => {
    setNewMovie({ ...newMovie, [type]: value });
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={newMovie.title}
        onChange={value => handleAddValue('title', value)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={newMovie.description}
        onChange={value => handleAddValue('description', value)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={newMovie.imgUrl}
        onChange={value => handleAddValue('imgUrl', value)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newMovie.imdbUrl}
        onChange={value => handleAddValue('imdbUrl', value)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={newMovie.imdbId}
        onChange={value => handleAddValue('imdbId', value)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={disabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
