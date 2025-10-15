import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

export interface Props {
  onAdd(movie: Movie): void;
}

export const NewMovie = ({ onAdd }: Props) => {
  const [count, setCount] = useState(0);

  const [form, setForm] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const movie: Movie = {
      title: form.title.trim(),
      description: form.description.trim(),
      imgUrl: form.imgUrl.trim(),
      imdbUrl: form.imdbUrl.trim(),
      imdbId: form.imdbId.trim(),
    };

    onAdd(movie);

    setForm({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });

    setCount(prevCount => prevCount + 1);
  };

  const isValid = [form.title, form.imgUrl, form.imdbUrl, form.imdbId].every(
    v => v.trim().length > 0,
  );

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
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
