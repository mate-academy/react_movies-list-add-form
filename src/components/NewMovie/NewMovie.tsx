import { useState } from 'react';
import { TextField } from '../TextField';
import './NewMovie.scss';
import { Movie } from '../../types/Movie';

interface Props {
  onAdd: (newMovie: Movie) => void;
}

const urlPattern =
  // eslint-disable-next-line max-len
  /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

const validateUrl = (value: string) => {
  return urlPattern.test(value.trim()) ? null : 'Invalid URL';
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [form, setForm] = useState<Movie>({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const [count, setCount] = useState(0);

  const handleChange = (field: keyof Movie) => (value: string) => {
    setForm(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const isFormValid =
    form.title.trim() !== '' &&
    form.imgUrl.trim() !== '' &&
    form.imdbUrl.trim() !== '' &&
    form.imdbId.trim() !== '';

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isFormValid) {
      return;
    }

    onAdd({
      ...form,
      description: form.description.trim(),
    });

    setForm({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });

    setCount(prevCount => prevCount + 1);
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
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
        validate={validateUrl}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={form.imdbUrl}
        onChange={handleChange('imdbUrl')}
        validate={validateUrl}
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
            disabled={!isFormValid}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
