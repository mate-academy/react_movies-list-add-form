import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface Props {
  onAdd: (movie: Omit<Movie, 'id'>) => void;
}

const INITIAL_FORM_STATE = {
  id: '',
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);

  const [form, setForm] = useState<Movie>(INITIAL_FORM_STATE);

  const handleFieldChange = (fieldName: keyof Movie) => (newValue: string) => {
    setForm(prevForm => ({
      ...prevForm,
      [fieldName]: newValue,
    }));
  };

  const handleReset = () => {
    setForm(INITIAL_FORM_STATE);
    setCount(prevCount => prevCount + 1);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onAdd(form);
    handleReset();
  };

  const isFormValid =
    form.title.trim() &&
    form.imgUrl.trim() &&
    form.imdbUrl.trim() &&
    form.imdbId.trim();

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={form.title}
        onChange={handleFieldChange('title')}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={form.description}
        onChange={handleFieldChange('description')}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={form.imgUrl}
        onChange={handleFieldChange('imgUrl')}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={form.imdbUrl}
        onChange={handleFieldChange('imdbUrl')}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={form.imdbId}
        onChange={handleFieldChange('imdbId')}
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
