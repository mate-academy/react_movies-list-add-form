import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';
import './NewMovie.scss';

interface NewMovieProps {
  onAdd?: (movie: Movie) => void;
}

export const NewMovie: React.FC<NewMovieProps> = ({ onAdd = () => {} }) => {
const urlPattern = /^(https?:\/\/)?([\w.-]+)\.([a-z.]{2,6})([\/\w.-]*)*\/?$/i;


  const [form, setForm] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const [formKey, setFormKey] = useState(0);

  const handleChange = (field: keyof typeof form) => (newValue: string) => {
    setForm(prev => ({ ...prev, [field]: newValue }));
  };

  const isFormValid = () => {
    const { title, imgUrl, imdbUrl, imdbId } = form;

    return [title, imgUrl, imdbUrl, imdbId].every(val => val.trim() !== '');
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!isFormValid()) {
      return;
    }

    onAdd({
      title: form.title.trim(),
      description: form.description.trim(),
      imgUrl: form.imgUrl.trim(),
      imdbUrl: form.imdbUrl.trim(),
      imdbId: form.imdbId.trim(),
    });

    // Reset form and validation state
    setForm({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
    setFormKey(prev => prev + 1);
  };

  return (
    <form className="NewMovie" key={formKey} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={form.title}
        onChange={handleChange('title')}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={form.description}
        onChange={handleChange('description')}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={form.imgUrl}
        onChange={handleChange('imgUrl')}
        required
        validate={value =>
          urlPattern.test(value.trim()) ? null : 'Invalid URL format'
        }
      />

      <TextField
        name="imdbUrl"
        label="IMDb URL"
        value={form.imdbUrl}
        onChange={handleChange('imdbUrl')}
        required
        validate={value =>
          urlPattern.test(value.trim()) ? null : 'Invalid URL format'
        }
      />

      <TextField
        name="imdbId"
        label="IMDb ID"
        value={form.imdbId}
        onChange={handleChange('imdbId')}
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
