import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const [errors, setErrors] = useState({
    title: false,
    description: false,
    imgUrl: false,
    imdbUrl: false,
    imdbId: false,
  });

  // зміна значення у формі
  const handleChange = (field: string, value: string) => {
    setForm(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  // зміна статусу помилки з TextField
  const handleErrorChange = (field: string, hasError: boolean) => {
    setErrors(prev => ({
      ...prev,
      [field]: hasError,
    }));
  };

  // перевірка чи форма валідна
  const isFormValid = () => {
    const hasEmpty =
      !form.title.trim() ||
      !form.imgUrl.trim() ||
      !form.imdbUrl.trim() ||
      !form.imdbId.trim();

    const hasErrors = Object.values(errors).some(Boolean);

    return !hasEmpty && !hasErrors;
  };

  const initialForm = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  const initialErrors = {
    title: false,
    description: false,
    imgUrl: false,
    imdbUrl: false,
    imdbId: false,
  };

  const formReset = () => {
    setForm(initialForm);
    setErrors(initialErrors);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!isFormValid()) {
      return;
    }

    onAdd({
      title: form.title.trim(),
      description: form.description.trim(),
      imgUrl: form.imgUrl.trim(),
      imdbUrl: form.imdbUrl.trim(),
      imdbId: form.imdbId.trim(),
    });

    formReset();
  };

  return (
    <form className="NewMovie" onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={form.title}
        onChange={value => handleChange('title', value)}
        onErrorChange={handleErrorChange}
        placeholder="Enter Title"
        required
      />

      <TextField
        name="description"
        label="Description"
        value={form.description}
        onChange={value => handleChange('description', value)}
        placeholder="Enter Description"
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={form.imgUrl}
        onChange={value => handleChange('imgUrl', value)}
        onErrorChange={handleErrorChange}
        placeholder="Enter Image URL"
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={form.imdbUrl}
        onChange={value => handleChange('imdbUrl', value)}
        onErrorChange={handleErrorChange}
        placeholder="Enter Imdb URL"
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={form.imdbId}
        onChange={value => handleChange('imdbId', value)}
        onErrorChange={handleErrorChange}
        placeholder="Enter Imdb ID"
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isFormValid()}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
