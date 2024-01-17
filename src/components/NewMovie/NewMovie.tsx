import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type AddMovie = {
  onAdd: (movie: Movie) => void
};

export const NewMovie: React.FC<AddMovie> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [formState, setFormState] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  } as Movie);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setCount(count + 1);

    onAdd(formState);
  };

  const handleChange = (variable: string) => {
    return ((newValue: string) => setFormState({
      ...formState,
      [variable]: newValue,
    }));
  };

  const isValid = formState.title.trim()
    && formState.imgUrl.trim()
    && formState.imdbUrl.trim()
    && formState.imdbId.trim();

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
        value={formState.title}
        onChange={handleChange('title')}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={formState.description}
        onChange={handleChange('description')}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={formState.imgUrl}
        onChange={handleChange('imgUrl')}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={formState.imdbUrl}
        onChange={handleChange('imdbUrl')}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={formState.imdbId}
        onChange={handleChange('imdbId')}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isValid}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
