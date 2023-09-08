import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);

  const [form, setForm] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const resetFormFields = () => {
    setCount(prevCount => prevCount + 1);
    setForm({
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
      title: form.title,
      description: form.description,
      imgUrl: form.imgUrl,
      imdbUrl: form.imdbUrl,
      imdbId: form.imdbId,
    });
  };

  const setFormState = (name: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const isButtonDisabled = !form.title
    || !form.imgUrl
    || !form.imdbUrl
    || !form.imdbId;

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
        onChange={(event) => setFormState('title', event)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={form.description}
        onChange={(event) => setFormState('description', event)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={form.imgUrl}
        onChange={(event) => setFormState('imgUrl', event)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={form.imdbUrl}
        onChange={(event) => setFormState('imdbUrl', event)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={form.imdbId}
        onChange={(event) => setFormState('imdbId', event)}
        required
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
