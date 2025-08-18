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
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [formKey, setFormKey] = useState(0);

  const handleChange = (field: keyof Movie, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const isValid =
    form.title.trim() &&
    form.imgUrl.trim() &&
    form.imdbUrl.trim() &&
    form.imdbId.trim();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!form.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!form.imgUrl.trim()) {
      newErrors.imgUrl = 'Image URL is required';
    }

    if (!form.imdbUrl.trim()) {
      newErrors.imdbUrl = 'IMDB URL is required';
    }

    if (!form.imdbId.trim()) {
      newErrors.imdbId = 'IMDB ID is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);

      return;
    }

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
    setErrors({});
    setFormKey(prev => prev + 1);
  };

  return (
    <form key={formKey} onSubmit={handleSubmit}>
      <TextField
        name="title"
        label="Title"
        value={form.title}
        onChange={v => handleChange('title', v)}
        required
        errorMessage={errors.title}
      />
      <TextField
        name="description"
        label="Description"
        value={form.description}
        onChange={v => handleChange('description', v)}
        errorMessage={errors.description}
      />
      <TextField
        name="imgUrl"
        label="Image URL"
        value={form.imgUrl}
        onChange={v => handleChange('imgUrl', v)}
        required
        errorMessage={errors.imgUrl}
      />
      <TextField
        name="imdbUrl"
        label="IMDB URL"
        value={form.imdbUrl}
        onChange={v => handleChange('imdbUrl', v)}
        required
        errorMessage={errors.imdbUrl}
      />
      <TextField
        name="imdbId"
        label="IMDB ID"
        value={form.imdbId}
        onChange={v => handleChange('imdbId', v)}
        required
        errorMessage={errors.imdbId}
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
