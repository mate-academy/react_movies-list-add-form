import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type FormFields = Omit<Movie, 'description'> & {
  description?: string;
};

type NewMovieProps = {
  onAdd: (movie: Movie) => void;
};

const initiateValues: FormFields = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

export const NewMovie = ({ onAdd }: NewMovieProps) => {
  const [form, setForm] = useState(initiateValues);
  const [formKey, setFormKey] = useState(0);

  const handleChange = (field: keyof FormFields) => (value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const isFormValid = () => {
    return Boolean(
      form.title.trim() &&
        form.imgUrl.trim() &&
        form.imdbUrl.trim() &&
        form.imdbId.trim(),
    );
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!isFormValid()) {
      return;
    }

    const newMovie: Movie = {
      ...form,
      title: form.title.trim(),
      description: form.description?.trim() || '',
      imgUrl: form.imgUrl.trim(),
      imdbUrl: form.imdbUrl.trim(),
      imdbId: form.imdbId.trim(),
    };

    onAdd(newMovie);

    setForm(initiateValues);
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
        value={form.description || ''}
        onChange={handleChange('description')}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={form.imgUrl}
        onChange={handleChange('imgUrl')}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={form.imdbUrl}
        onChange={handleChange('imdbUrl')}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
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
