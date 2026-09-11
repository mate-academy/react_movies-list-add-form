import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface Props {
  onAdd: (newMovie: Movie) => void;
}
export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [form, setForm] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const handleFormSubmit = (event: React.FormEvent) => {
    event?.preventDefault();
    setCount(prev => prev + 1);
    onAdd({
      title: form.title,
      description: form.description,
      imgUrl: form.imgUrl,
      imdbUrl: form.imdbUrl,
      imdbId: form.imdbId,
    });
    setForm({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  const handleInputChange = (name: string, value: string) => {
    return setForm({
      ...form,
      [name]: value,
    });
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleFormSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={form.title}
        onChange={handleInputChange}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={form.description}
        onChange={handleInputChange}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        required
        value={form.imgUrl}
        onChange={handleInputChange}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        required
        value={form.imdbUrl}
        onChange={handleInputChange}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        required
        value={form.imdbId}
        onChange={handleInputChange}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={
              !form.title.trim() ||
              !form.imgUrl.trim() ||
              !form.imdbUrl.trim() ||
              !form.imdbId.trim()
            }
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
