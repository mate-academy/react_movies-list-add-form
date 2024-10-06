import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';
interface NewMovieProps {
  onAdd: (movie: Movie) => void;
}

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
  };

  const handleBlur = (field: keyof typeof form) => {
    setTouched({
      ...touched,
      [field]: true,
    });

    validateField(field);
  };

  const handleChange = (name: string) => (value: string) => {
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const validateUrl = (value: string) => {
    const pattern =
      // eslint-disable-next-line max-len
      /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

    return pattern.test(value) ? '' : 'Invalid URL';
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

      <TextField
        name="title"
        label="Title"
        value={form.title}
        onChange={handleChange('title')}
        onBlur={() => handleBlur('title')}
        error={errors.title}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={form.description}
        onChange={handleChange('description')}
        onBlur={() => handleBlur('description')}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={form.imgUrl}
        onChange={handleChange('imgUrl')}
        onBlur={() => handleBlur('imgUrl')}
        error={errors.imgUrl}
        validate={validateUrl}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={form.imdbUrl}
        onChange={handleChange('imdbUrl')}
        onBlur={() => handleBlur('imdbUrl')}
        error={errors.imdbUrl}
        validate={validateUrl}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={form.imdbId}
        onChange={handleChange('imdbId')}
        onBlur={() => handleBlur('imdbId')}
        error={errors.imdbId}
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

export default NewMovie;
