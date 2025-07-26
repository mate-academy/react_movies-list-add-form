import { useState } from 'react';
import { TextField } from '../TextField';

const URL_PATTERN = /^https?:\/\/.+/i;

interface MovieData {
  title: string;
  description: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
}

interface NewMovieProps {
  onAdd?: (movie: MovieData) => void;
}

export const NewMovie: React.FC<NewMovieProps> = ({ onAdd }) => {
  const [formData, setFormData] = useState<MovieData>({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const [errors, setErrors] = useState({
    title: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const [count, setCount] = useState(0);

  const validateUrl = (value: string) => {
    if (!URL_PATTERN.test(value)) {
      return 'Please enter a valid URL';
    }

    return null;
  };

  const handleChange = (field: keyof MovieData) => (value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [field]: '',
      }));
    }
  };

  const handleBlur = (field: keyof MovieData) => () => {
    if (field === 'description') {
      return;
    }

    let error = '';
    const value = formData[field];

    if (!value.trim()) {
      error = `${field} is required`;
    } else if (
      (field === 'imgUrl' || field === 'imdbUrl') &&
      !URL_PATTERN.test(value)
    ) {
      error = 'Please enter a valid URL';
    }

    setErrors(prev => ({
      ...prev,
      [field]: error,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      title: !formData.title.trim() ? 'Title is required' : '',
      imgUrl: !formData.imgUrl.trim()
        ? 'Image URL is required'
        : !URL_PATTERN.test(formData.imgUrl)
          ? 'Please enter a valid URL'
          : '',
      imdbUrl: !formData.imdbUrl.trim()
        ? 'Imdb URL is required'
        : !URL_PATTERN.test(formData.imdbUrl)
          ? 'Please enter a valid URL'
          : '',
      imdbId: !formData.imdbId.trim() ? 'Imdb ID is required' : '',
    };

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some(error => error);

    if (hasErrors) {
      return;
    }

    if (onAdd) {
      onAdd({
        ...formData,
        title: formData.title.trim(),
        imgUrl: formData.imgUrl.trim(),
        imdbUrl: formData.imdbUrl.trim(),
        imdbId: formData.imdbId.trim(),
        description: formData.description.trim(),
      });
    }

    setFormData({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
    setCount(prev => prev + 1);
  };

  const isSubmitDisabled =
    !formData.title.trim() ||
    !formData.imgUrl.trim() ||
    !formData.imdbUrl.trim() ||
    !formData.imdbId.trim() ||
    Object.values(errors).some(error => error);

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={formData.title}
        onChange={handleChange('title')}
        onBlur={handleBlur('title')}
        error={errors.title}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={formData.description}
        onChange={handleChange('description')}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={formData.imgUrl}
        onChange={handleChange('imgUrl')}
        onBlur={handleBlur('imgUrl')}
        error={errors.imgUrl}
        required
        validate={validateUrl}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={formData.imdbUrl}
        onChange={handleChange('imdbUrl')}
        onBlur={handleBlur('imdbUrl')}
        error={errors.imdbUrl}
        required
        validate={validateUrl}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={formData.imdbId}
        onChange={handleChange('imdbId')}
        onBlur={handleBlur('imdbId')}
        error={errors.imdbId}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isSubmitDisabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
