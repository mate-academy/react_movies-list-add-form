import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const defaultMovie = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  const [count, setCount] = useState(0);
  const [form, setForm] = useState(defaultMovie);

  const isButtonDisabled = !form.title || !form.imgUrl
    || !form.imdbUrl || !form.imdbId;

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onAdd(form);
    setForm(defaultMovie);
    setCount((pervCount) => pervCount + 1);
  };

  return (
    <form className="NewMovie" key={count} onSubmit={onSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={form.title}
        onChange={(newValue) => setForm({ ...form, title: newValue })}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={form.description}
        onChange={(newValue) => setForm({ ...form, description: newValue })}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={form.imgUrl}
        required
        onChange={(newValue) => setForm({ ...form, imgUrl: newValue })}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={form.imdbUrl}
        required
        onChange={(newValue) => setForm({ ...form, imdbUrl: newValue })}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={form.imdbId}
        required
        onChange={(newValue) => setForm({ ...form, imdbId: newValue })}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isButtonDisabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
