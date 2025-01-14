/* eslint-disable prettier/prettier */
import { useState } from 'react';
import { TextField } from '../TextField';

interface Props {
  onAdd: (formData: {
    title: string;
    description: string;
    imgUrl: string;
    imdbUrl: string;
    imdbId: string;
  }) => void;
}

export const NewMovie = ({ onAdd }: Props) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const [errors, setErrors] = useState<
  // eslint-disable-next-line prettier/prettier
  // eslint-disable-next-line prettier/prettier, @typescript-eslint/indent
    Partial<Record<keyof typeof formData, string>>
  >({});

  const handleChange = (
    name: keyof typeof formData,
    newValue: string,
  ): void => {
    setFormData(prevData => ({
      ...prevData,
      [name]: newValue,
    }));

    if (errors[name]) {
      setErrors(prevErrors => {
        const updatedErrors = { ...prevErrors };

        delete updatedErrors[name];

        return updatedErrors;
      });
    }
  };

  const handleBlur = (name: keyof typeof formData): void => {
    if (['title', 'imgUrl', 'imdbUrl', 'imdbId'].includes(name)) {
      const value = formData[name].trim();

      if (!value) {
        setErrors(prevErrors => ({
          ...prevErrors,
          [name]: `${name} is required`,
        }));
      } else {
        setErrors(prevErrors => {
          const updatedErrors = { ...prevErrors };

          delete updatedErrors[name];

          return updatedErrors;
        });
      }
    }
  };

  const isFormValid = (): boolean => {
    return ['title', 'imgUrl', 'imdbUrl', 'imdbId'].every(
      field => formData[field as keyof typeof formData].trim() !== '',
    );
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newErrors: Partial<Record<keyof typeof formData, string>> = {};

    ['title', 'imgUrl', 'imdbUrl', 'imdbId'].forEach(field => {
      if (!formData[field as keyof typeof formData].trim()) {
        newErrors[field as keyof typeof formData] = `${field} is required`;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);

      return;
    }

    onAdd(formData);

    setFormData({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
    
    setErrors({});
  };

  return (
    <form className="NewMovie" onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={formData.title}
        onChange={value => handleChange('title', value)}
        onBlur={() => handleBlur('title')}
        error={errors.title}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={formData.description}
        onChange={value => handleChange('description', value)}
        onBlur={() => handleBlur('description')}
        error={errors.description}
        required
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={formData.imgUrl}
        onChange={value => handleChange('imgUrl', value)}
        onBlur={() => handleBlur('imgUrl')}
        error={errors.imgUrl}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={formData.imdbUrl}
        onChange={value => handleChange('imdbUrl', value)}
        onBlur={() => handleBlur('imdbUrl')}
        error={errors.imdbUrl}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={formData.imdbId}
        onChange={value => handleChange('imdbId', value)}
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
