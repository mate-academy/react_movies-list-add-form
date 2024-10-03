import { FC, FormEvent, useState } from 'react';

import { Movie } from '../../types/Movie';

import { pattern } from '../../constants/pattern';

import { TextField } from '../TextField';

interface Props {
  onAdd: (movie: Movie) => void;
}

const initialFormState: Movie = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

const initialValidationState = {
  title: false,
  description: false,
  imgUrl: false,
  imdbUrl: false,
  imdbId: false,
};

export const NewMovie: FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [formData, setFormData] = useState<Movie>(initialFormState);
  const [validation, setValidation] = useState(initialValidationState);

  const isFormValid = Object.values(validation).every(Boolean);

  const reset = () => {
    setFormData(initialFormState);
    setValidation(initialValidationState);
  };

  const validateField = (name: string, value: string) => {
    if (name === 'imgUrl' || name === 'imdbUrl') {
      return pattern.test(value.trim());
    }

    return value.trim().length > 0;
  };

  const validateUrl = (value: string) => {
    if (!pattern.test(value)) {
      return 'Invalid URL format';
    }

    return null;
  };

  const handleChange = (name: keyof typeof initialFormState, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    setValidation(prev => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleValidation = (
    name: keyof typeof initialValidationState,
    value: boolean,
  ) => {
    setValidation(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (isFormValid) {
      onAdd(formData);
      reset();
      setCount(count + 1);
    }
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={formData.title}
        onChange={value => handleChange('title', value)}
        onValidationChange={isValid => handleValidation('title', isValid)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={formData.description}
        onChange={value => handleChange('description', value)}
        onValidationChange={isValid => handleValidation('description', isValid)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={formData.imgUrl}
        onChange={value => handleChange('imgUrl', value)}
        validate={validateUrl}
        onValidationChange={isValid => handleValidation('imgUrl', isValid)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={formData.imdbUrl}
        onChange={value => handleChange('imdbUrl', value)}
        validate={validateUrl}
        onValidationChange={isValid => handleValidation('imdbUrl', isValid)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={formData.imdbId}
        onChange={value => handleChange('imdbId', value)}
        onValidationChange={isValid => handleValidation('imdbId', isValid)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isFormValid}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
