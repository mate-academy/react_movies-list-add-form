import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface Props {
  onAdd: (movie: Movie) => void
}

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [form, setForm] = useState<Movie>({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setCount((currentCount) => currentCount + 1);

    onAdd(form);

    setForm({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  const sumbitCheck = !(
    form.title.trim()
    && form.imgUrl.trim()
    && form.imdbUrl.trim()
    && form.imdbId.trim()
  );

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
        onChange={(newValue => setForm({
          ...form,
          title: newValue,
        }))}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={form.description}
        onChange={(newValue => setForm({
          ...form,
          description: newValue,
        }))}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={form.imgUrl}
        onChange={(newValue => setForm({
          ...form,
          imgUrl: newValue,
        }))}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={form.imdbUrl}
        onChange={(newValue => setForm({
          ...form,
          imdbUrl: newValue,
        }))}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={form.imdbId}
        onChange={(newValue => setForm({
          ...form,
          imdbId: newValue,
        }))}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={sumbitCheck}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
