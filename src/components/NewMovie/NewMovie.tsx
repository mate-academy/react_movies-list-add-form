import { useState, FormEvent, useCallback } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface NewMovieProps {
  onAdd: (newMovie: Movie) => void;
}

const EMPTY_FORM = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

export const NewMovie: React.FC<NewMovieProps> = ({ onAdd }) => {
  const [formResetKey, setFormResetKey] = useState(0);
  const [formData, setFormData] = useState({ ...EMPTY_FORM });

  const requiredFields = ['title', 'imgUrl', 'imdbUrl', 'imdbId'];

  const isFormValid = requiredFields.every(
    field => !!formData[field as keyof typeof formData],
  );

  const handleFieldChange = useCallback((fieldName: string, value: string) => {
    setFormData(prevData => ({
      ...prevData,
      [fieldName]: value,
    }));
  }, []);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (isFormValid) {
      onAdd({ ...formData });

      setFormData({ ...EMPTY_FORM });
      setFormResetKey(prev => prev + 1);
    }
  };

  return (
    <form className="NewMovie" key={formResetKey} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={formData.title}
        onChange={value => handleFieldChange('title', value)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={formData.description}
        onChange={value => handleFieldChange('description', value)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={formData.imgUrl}
        onChange={value => handleFieldChange('imgUrl', value)}
        required
      />

      <TextField
        name="imdbUrl"
        label="IMDB URL"
        value={formData.imdbUrl}
        onChange={value => handleFieldChange('imdbUrl', value)}
        required
      />

      <TextField
        name="imdbId"
        label="IMDB ID"
        value={formData.imdbId}
        onChange={value => handleFieldChange('imdbId', value)}
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
