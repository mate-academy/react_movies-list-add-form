import { useState } from 'react';
import { TextField } from '../TextField';
import type { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

type FormState = {
  title: string;
  description: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
};

const initialState: FormState = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [form, setForm] = useState<FormState>(initialState);

  const [key, setKey] = useState(0);

  const handleChange = (name: keyof FormState, value: string) => {
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const isValid =
    form.title.trim() !== '' &&
    form.imgUrl.trim() !== '' &&
    form.imdbUrl.trim() !== '' &&
    form.imdbId.trim() !== '';

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault();

    if (!isValid) {
      return;
    }

    const movie: Movie = {
      title: form.title.trim(),
      description: form.description.trim(),
      imgUrl: form.imgUrl.trim(),
      imdbUrl: form.imdbUrl.trim(),
      imdbId: form.imdbId.trim(),
    };

    onAdd(movie);

    setForm(initialState);
    setKey(prev => prev + 1);
  };

  return (
    <form className="NewMovie" key={key} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={form.title}
        onChange={v => handleChange('title', v)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={form.description}
        onChange={v => handleChange('description', v)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={form.imgUrl}
        onChange={v => handleChange('imgUrl', v)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={form.imdbUrl}
        onChange={v => handleChange('imdbUrl', v)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={form.imdbId}
        onChange={v => handleChange('imdbId', v)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isValid}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
