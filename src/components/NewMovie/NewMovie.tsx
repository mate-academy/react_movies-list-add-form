import React, { useState } from 'react';

import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

const blankMovie: Movie = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

interface Props {
  onAdd: (movie: Movie) => void
}

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [form, setForm] = useState<Movie>(blankMovie);
  const [count, setCount] = useState(0);

  const isDataValid = form.title && form.imgUrl && form.imdbUrl && form.imdbId;

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isDataValid) {
      return;
    }

    onAdd(form);
    setForm(blankMovie);
    setCount((prevCount) => prevCount + 1);
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={form.title}
        onChange={handleChange}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={form.description}
        onChange={handleChange}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={form.imgUrl}
        onChange={handleChange}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={form.imdbUrl}
        onChange={handleChange}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={form.imdbId}
        onChange={handleChange}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isDataValid}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
