import React, { useState } from 'react';
import { TextField } from '../TextField/TextField';
import { Movie } from '../../types/Movie';

interface Props {
  onAdd: (movie: Movie) => void;
}

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
    imgUrl: false,
    imdbUrl: false,
    imdbId: false,
  });

  const [isFormValid, setIsFormValid] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setForm(prevForm => ({
      ...prevForm,
      [name]: value,
    }));

    const requiredFields = ['title', 'imgUrl', 'imdbUrl', 'imdbId'];

    setIsFormValid(
      requiredFields.every(field => form[field as keyof typeof form]
        && form[field as keyof typeof form].trim() !== ''),
    );
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: value.trim() === '',
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const requiredFields = ['title', 'imgUrl', 'imdbUrl', 'imdbId'];

    if (requiredFields.some(field => errors[field as keyof typeof errors])) {
      return;
    }

    onAdd(form);
    setForm({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });

    setIsFormValid(false);
  };

  return (
    <form onSubmit={handleSubmit} className="NewMovie">
      <h2 className="title">Add a movie</h2>
      <TextField
        name="title"
        value={form.title}
        onChange={handleInputChange}
        onBlur={handleBlur}
        error={errors.title}
      />
      <TextField
        name="description"
        value={form.description}
        onChange={handleInputChange}
        onBlur={handleBlur}
      />
      <TextField
        name="imgUrl"
        value={form.imgUrl}
        onChange={handleInputChange}
        onBlur={handleBlur}
        error={errors.imgUrl}
      />
      <TextField
        name="imdbUrl"
        value={form.imdbUrl}
        onChange={handleInputChange}
        onBlur={handleBlur}
        error={errors.imdbUrl}
      />
      <TextField
        name="imdbId"
        value={form.imdbId}
        onChange={handleInputChange}
        onBlur={handleBlur}
        error={errors.imdbId}
      />
      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            disabled={!isFormValid}
            className="button is-link"
            data-cy="submit-button"
          >
            Add movie
          </button>
        </div>
      </div>
    </form>
  );
};
