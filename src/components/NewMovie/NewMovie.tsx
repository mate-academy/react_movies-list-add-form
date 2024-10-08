import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface NewMovieProps {
  onAdd: (movie: Movie) => void;
}

// Функція для валідації URL
const validateUrl = (value: string): string => {
  const pattern =
    // eslint-disable-next-line max-len
    /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

  return pattern.test(value) ? '' : 'Invalid URL';
};

const fieldsConfig = [
  { name: 'title', label: 'Title', required: true },
  { name: 'description', label: 'Description', required: false },
  { name: 'imgUrl', label: 'Image URL', required: true, validate: validateUrl },
  { name: 'imdbUrl', label: 'Imdb URL', required: true, validate: validateUrl },
  { name: 'imdbId', label: 'Imdb ID', required: true },
];

export const NewMovie: React.FC<NewMovieProps> = ({ onAdd }) => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const [errors, setErrors] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const [touched, setTouched] = useState({
    title: false,
    description: false,
    imgUrl: false,
    imdbUrl: false,
    imdbId: false,
  });

  const isFormValid = () => {
    return (
      form.title.trim() &&
      form.imgUrl.trim() &&
      form.imdbUrl.trim() &&
      form.imdbId.trim()
    );
  };

  const validateField = (field: keyof typeof form) => {
    if (!form[field].trim() && field !== 'description') {
      setErrors(prevErrors => ({
        ...prevErrors,
        [field]: `${field} is required`,
      }));
    } else {
      setErrors(prevErrors => ({
        ...prevErrors,
        [field]: '',
      }));
    }

    const fieldConfig = fieldsConfig.find(config => config.name === field);

    if (fieldConfig?.validate) {
      const errorMessage = fieldConfig.validate(form[field]);

      if (errorMessage) {
        setErrors(prevErrors => ({
          ...prevErrors,
          [field]: errorMessage,
        }));
      }
    }
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const { name } = event.target;

    setTouched({
      ...touched,
      [name]: true,
    });

    validateField(name as keyof typeof form);
  };

  const handleChange = (name: keyof typeof form) => (newValue: string) => {
    setForm(prev => ({ ...prev, [name]: newValue }));
    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid()) {
      return;
    }

    const newMovie: Movie = {
      title: form.title,
      description: form.description,
      imgUrl: form.imgUrl,
      imdbUrl: form.imdbUrl,
      imdbId: form.imdbId,
    };

    onAdd(newMovie);

    setForm({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });

    setErrors({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
    setTouched({
      title: false,
      description: false,
      imgUrl: false,
      imdbUrl: false,
      imdbId: false,
    });
  };

  return (
    <form className="NewMovie" onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      {fieldsConfig.map(({ name, label, required }) => (
        <TextField
          key={name}
          name={name}
          label={label}
          value={form[name]}
          onChange={handleChange(name)}
          onBlur={handleBlur}
          error={errors[name]}
          required={required}
        />
      ))}

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

export default NewMovie;
