import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

const EMPTY_FORM = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

type Form = {
  title: string,
  description: string,
  imgUrl: string,
  imdbUrl: string,
  imdbId: string,
};

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [form, setForm] = useState<Form>(EMPTY_FORM);
  const [count, setCount] = useState(0);
  const isDataValid = form.title && form.imgUrl && form.imdbUrl && form.imdbId;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isDataValid) {
      return;
    }

    onAdd(form);
    setCount(prevCount => prevCount + 1);
    setForm(EMPTY_FORM);
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
        value={form.title}
        onChange={(value) => setForm({ ...form, title: value })}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={form.description}
        onChange={(value) => setForm({ ...form, description: value })}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={form.imgUrl}
        onChange={(value) => setForm({ ...form, imgUrl: value })}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={form.imdbUrl}
        onChange={(value) => setForm({ ...form, imdbUrl: value })}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={form.imdbId}
        onChange={(value) => setForm({ ...form, imdbId: value })}
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
