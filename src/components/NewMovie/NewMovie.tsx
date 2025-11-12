import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';
import { title } from 'process';

interface Form {
  title: string;
  description: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
}

export const NewMovie = ({ onAdd }: { onAdd: (movie: Movie) => void }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const initialFormState = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  }
  const [form, setForm] = useState(initialFormState);

  function isFilled(str?: string) {
    return Boolean(str && str.trim());
  }

  const isFormValid = Boolean(
    [form.title, form.imgUrl, form.imdbUrl, form.imdbId].every(isFilled),
  );

  function handleChange(name: string, value: string) {
    setForm(prev => ({ ...prev, [name as keyof Form]: value }));
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!isFormValid) {
      return;
    }

    const movie = {
      title: form.title.trim(),
      description: form.description.trim(),
      imgUrl: form.imgUrl.trim(),
      imdbUrl: form.imdbUrl.trim(),
      imdbId: form.imdbId.trim(),
    };

    onAdd(movie);
    setCount(prevCount => prevCount + 1);
    setForm(initialFormState);
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={form.title}
        onChange={handleChange}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={form.description}
        onChange={handleChange}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={form.imgUrl}
        onChange={handleChange}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={form.imdbUrl}
        onChange={handleChange}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={form.imdbId}
        onChange={handleChange}
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
