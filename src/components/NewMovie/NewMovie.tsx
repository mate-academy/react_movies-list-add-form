import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

const initialForm = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [form, setForm] = useState(initialForm);

  const handleChange = (name: string, value: string) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const isValid =
      form.title.trim() !== '' &&
      form.imgUrl.trim() !== '' &&
      form.imdbUrl.trim() !== '' &&
      form.imdbId.trim() !== '';

    if (!isValid) {
      alert('Please fill all fields');

      return;
    }

    onAdd(form);
    setForm(initialForm);
    setCount(c => c + 1);
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={form.title}
        onChange={value => {
          handleChange('title', value);
        }}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={form.description}
        onChange={value => {
          handleChange('description', value);
        }}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={form.imgUrl}
        onChange={value => {
          handleChange('imgUrl', value);
        }}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={form.imdbUrl}
        onChange={value => {
          handleChange('imdbUrl', value);
        }}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={form.imdbId}
        onChange={value => {
          handleChange('imdbId', value);
        }}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={
              !form.title || !form.imgUrl || !form.imdbUrl || !form.imdbId
            }
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
