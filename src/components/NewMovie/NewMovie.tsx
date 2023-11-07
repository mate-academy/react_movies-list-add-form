import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);

  const initialForm = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  const [form, setForm] = useState(initialForm);

  const handleChange = (value: string, field: string) => {
    setForm(prevForm => ({
      ...prevForm,
      [field]: value,
    }));
  };

  const isHaveText = (!form.title || !form.imgUrl
    || !form.imdbUrl || !form.imdbId);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (isHaveText) {
      return;
    }

    onAdd(form);
    setForm(initialForm);
    setCount(count + 1);
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={handleSubmit}
    >
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
            disabled={isHaveText && true}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
