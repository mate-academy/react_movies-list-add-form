import React, { useState } from 'react';
import { Movie } from '../../types/Movie';
import { TextField } from '../TextField';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [form, setForm] = useState<Movie>({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const handleChange = (field: keyof Movie, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const isValid =
    form.title.trim() &&
    form.imgUrl.trim() &&
    form.imdbUrl.trim() &&
    form.imdbId.trim();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!isValid) {
      return;
    }

    onAdd({ ...form, title: form.title.trim() });
    setForm({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        name="title"
        label="Title"
        value={form.title}
        onChange={v => handleChange('title', v)}
        required
      />
      <TextField
        name="description"
        label="Description"
        value={form.description}
        onChange={v => handleChange('description', v)}
      />
      <TextField
        name="imgUrl"
        label="Image URL"
        value={form.imgUrl}
        onChange={v => handleChange('imgUrl', v)}
        required
      />
      <TextField
        name="imdbUrl"
        label="IMDB URL"
        value={form.imdbUrl}
        onChange={v => handleChange('imdbUrl', v)}
        required
      />
      <TextField
        name="imdbId"
        label="IMDB ID"
        value={form.imdbId}
        onChange={v => handleChange('imdbId', v)}
        required
      />
      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className="button is-link"
            disabled={!isValid}
            data-cy="submit-button"
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
