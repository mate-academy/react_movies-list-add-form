import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });
  let isFormFull = true;

  for (const key in formData) {
    const currentKey = key as keyof typeof formData;

    if (currentKey !== 'description') {
      if (formData[currentKey].trim() === '') {
        isFormFull = false;
      }
    }
  }

  const handleFieldChange =
    (fieldName: keyof typeof formData) => (value: string) => {
      setFormData(prev => ({
        ...prev,
        [fieldName]: value,
      }));
    };

  function resetForm() {
    setFormData({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (true) {
    }

    onAdd(formData);
    resetForm();
  };

  return (
    <form className="NewMovie" onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={formData.title}
        onChange={handleFieldChange('title')}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={formData.description}
        onChange={handleFieldChange('description')}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={formData.imgUrl}
        onChange={handleFieldChange('imgUrl')}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={formData.imdbUrl}
        onChange={handleFieldChange('imdbUrl')}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={formData.imdbId}
        onChange={handleFieldChange('imdbId')}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isFormFull}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
