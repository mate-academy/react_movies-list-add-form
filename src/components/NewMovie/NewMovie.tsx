import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface Props {
  onAdd: (movie: Movie) => void;
}

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });
  const [count, setCount] = useState(0);

  const handleChange = (name: string, value: string) => {
    setForm(f => ({ ...f, [name]: value }));
  };

  const isValid = [form.title, form.imgUrl, form.imdbUrl, form.imdbId].every(
    val => val.trim() !== '',
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) {
      return;
    }

    onAdd({
      ...form,
      title: form.title.trim(),
      imgUrl: form.imgUrl.trim(),
      imdbUrl: form.imdbUrl.trim(),
      imdbId: form.imdbId.trim(),
    });
    setForm({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
    setCount(c => c + 1);
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={handleSubmit}
      autoComplete="off"
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={form.title}
        onChange={value => handleChange('title', value)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={form.description}
        onChange={value => handleChange('description', value)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={form.imgUrl}
        onChange={value => handleChange('imgUrl', value)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={form.imdbUrl}
        onChange={value => handleChange('imdbUrl', value)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={form.imdbId}
        onChange={value => handleChange('imdbId', value)}
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
