import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';
import './NewMovie.scss';

interface Props {
  onAdd: (movie: Omit<Movie, 'id'>) => void;
}

const urlPattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [formKey, setFormKey] = useState(0); // Додано для скидання форми
  const [formData, setFormData] = useState({
    title: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    description: '',
  });

  const [errors, setErrors] = useState({
    title: false,
    imgUrl: false,
    imdbUrl: false,
    imdbId: false,
  });

  const [urlErrors, setUrlErrors] = useState({
    imgUrl: false,
    imdbUrl: false,
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [field]: false,
      }));
    }

    if ((field === 'imgUrl' || field === 'imdbUrl') && urlErrors[field as keyof typeof urlErrors]) {
      setUrlErrors(prev => ({
        ...prev,
        [field]: false,
      }));
    }
  };

  const handleBlur = (field: string, value: string) => {
    const trimmedValue = value.trim();
    const isEmpty = trimmedValue === '';

    // Required field validation
    if (field !== 'description') {
      setErrors(prev => ({
        ...prev,
        [field]: isEmpty,
      }));
    }

    // URL validation
    if ((field === 'imgUrl' || field === 'imdbUrl') && !isEmpty) {
      const isUrlValid = urlPattern.test(trimmedValue);
      setUrlErrors(prev => ({
        ...prev,
        [field]: !isUrlValid,
      }));
    }
  };

  const isFormValid = () => {
    const requiredFields = ['title', 'imgUrl', 'imdbUrl', 'imdbId'];

    return requiredFields.every(field => {
      const value = formData[field as keyof typeof formData].trim();

      if (value === '') {
        return false;
      }

      if ((field === 'imgUrl' || field === 'imdbUrl') && !urlPattern.test(value)) {
        return false;
      }

      return true;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields before submission
    const newErrors = {
      title: formData.title.trim() === '',
      imgUrl: formData.imgUrl.trim() === '',
      imdbUrl: formData.imdbUrl.trim() === '',
      imdbId: formData.imdbId.trim() === '',
    };

    const newUrlErrors = {
      imgUrl: formData.imgUrl.trim() !== '' && !urlPattern.test(formData.imgUrl.trim()),
      imdbUrl: formData.imdbUrl.trim() !== '' && !urlPattern.test(formData.imdbUrl.trim()),
    };

    setErrors(newErrors);
    setUrlErrors(newUrlErrors);

    if (!isFormValid()) {
      return;
    }

    // Submit the movie
    onAdd({
      title: formData.title.trim(),
      imgUrl: formData.imgUrl.trim(),
      imdbUrl: formData.imdbUrl.trim(),
      imdbId: formData.imdbId.trim(),
      description: formData.description.trim(),
    });

    // Clear form completely
    setFormData({
      title: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
      description: '',
    });
    setErrors({
      title: false,
      imgUrl: false,
      imdbUrl: false,
      imdbId: false,
    });
    setUrlErrors({
      imgUrl: false,
      imdbUrl: false,
    });

    // Force form re-render to clear all errors and states
    setFormKey(prev => prev + 1);
  };

  const getFieldError = (field: string): boolean => {
    return errors[field as keyof typeof errors] || urlErrors[field as keyof typeof urlErrors];
  };

  return (
    <form className="NewMovie" onSubmit={handleSubmit} key={formKey}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={formData.title}
        onChange={(value) => handleChange('title', value)}
        onBlur={() => handleBlur('title', formData.title)}
        required
        error={getFieldError('title')}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={formData.imgUrl}
        onChange={(value) => handleChange('imgUrl', value)}
        onBlur={() => handleBlur('imgUrl', formData.imgUrl)}
        required
        error={getFieldError('imgUrl')}
      />

      <TextField
        name="imdbUrl"
        label="IMDB URL"
        value={formData.imdbUrl}
        onChange={(value) => handleChange('imdbUrl', value)}
        onBlur={() => handleBlur('imdbUrl', formData.imdbUrl)}
        required
        error={getFieldError('imdbUrl')}
      />

      <TextField
        name="imdbId"
        label="IMDB ID"
        value={formData.imdbId}
        onChange={(value) => handleChange('imdbId', value)}
        onBlur={() => handleBlur('imdbId', formData.imdbId)}
        required
        error={getFieldError('imdbId')}
      />

      <TextField
        name="description"
        label="Description"
        value={formData.description}
        onChange={(value) => handleChange('description', value)}
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
