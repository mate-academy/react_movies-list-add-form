import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface NewMovieProps {
  onAdd: (movie: Movie) => void;
}

type MovieField = 'title' | 'description' | 'imgUrl' | 'imdbUrl' | 'imdbId';

const validateUrl = (value: string) => {
  const pattern =
    // eslint-disable-next-line max-len
    /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

  return pattern.test(value) ? '' : 'Invalid URL';
};

const fields: Array<{
  name: MovieField;
  label: string;
  required?: boolean;
  validate?: (value: string) => string;
}> = [
  { name: 'title', label: 'Title', required: true },
  { name: 'description', label: 'Description' },
  { name: 'imgUrl', label: 'Image URL', required: true, validate: validateUrl },
  { name: 'imdbUrl', label: 'Imdb URL', required: true, validate: validateUrl },
  { name: 'imdbId', label: 'Imdb ID', required: true },
];

export const NewMovie: React.FC<NewMovieProps> = ({ onAdd }) => {
  const [form, setForm] = useState<Record<MovieField, string>>({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const [touched, setTouched] = useState<Record<MovieField, boolean>>({
    title: false,
    description: false,
    imgUrl: false,
    imdbUrl: false,
    imdbId: false,
  });

  const [errors, setErrors] = useState<Record<MovieField, string>>({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const isFormValid = () => {
    return (
      form.title.trim() &&
      form.imgUrl.trim() &&
      form.imdbUrl.trim() &&
      form.imdbId.trim()
    );
  };

  const validateField = (field: MovieField) => {
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
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const { name } = event.target;

    setTouched({ ...touched, [name]: true });
    validateField(name as keyof typeof form);
  };

  const handleChange = (event: { target: { name: string; value: string } }) => {
    const { name, value } = event.target;

    setForm(prev => ({ ...prev, [name]: value }));
    setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid()) {
      return;
    }

    onAdd({
      title: form.title,
      description: form.description,
      imgUrl: form.imgUrl,
      imdbUrl: form.imdbUrl,
      imdbId: form.imdbId,
    });

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
  };

  return (
    <form className="NewMovie" onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      {fields.map(({ name, label, required, validate }) => (
        <TextField
          key={name}
          name={name}
          label={label}
          value={form[name]}
          onChange={(value: string) =>
            handleChange({
              target: { name, value },
            })
          }
          onBlur={handleBlur}
          error={errors[name]}
          required={required}
          validate={validate}
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
