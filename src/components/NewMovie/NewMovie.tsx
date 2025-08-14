import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface Props {
  onAdd: (movie: Movie) => void;
}

export const NewMovie = ({ onAdd }: Props) => {
  const [count, setCount] = useState(0);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const isFormValid = () => {
    return (
      formData.title.trim() !== '' &&
      formData.imgUrl.trim() !== '' &&
      formData.imdbUrl.trim() !== '' &&
      formData.imdbId.trim() !== ''
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isFormValid()) {
      const newMovie: Movie = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        imgUrl: formData.imgUrl.trim(),
        imdbUrl: formData.imdbUrl.trim(),
        imdbId: formData.imdbId.trim(),
      };

      onAdd(newMovie);

      setFormData({
        title: '',
        description: '',
        imgUrl: '',
        imdbUrl: '',
        imdbId: '',
      });

      setCount(prev => prev + 1);
    }
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>
      <TextField
        name="title"
        label="Title"
        value={formData.title}
        onChange={value => handleInputChange('title', value)}
        required
      />
      <TextField
        name="description"
        label="Description"
        value={formData.description}
        onChange={value => handleInputChange('description', value)}
      />
      <TextField
        name="imgUrl"
        label="Image URL"
        value={formData.imgUrl}
        onChange={value => handleInputChange('imgUrl', value)}
        required
      />
      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={formData.imdbUrl}
        onChange={value => handleInputChange('imdbUrl', value)}
        required
      />
      <TextField
        name="imdbId"
        label="Imdb ID"
        value={formData.imdbId}
        onChange={value => handleInputChange('imdbId', value)}
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
      </div>{' '}
    </form>
  );
};
