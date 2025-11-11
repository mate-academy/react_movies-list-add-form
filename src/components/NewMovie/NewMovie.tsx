import React, { useState } from 'react';
import { TextField } from '../TextField';

type Props = {
  onAdd: (movie: MovieType) => void;
};

type MovieType = {
  title: string;
  description: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
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

  const [form, SetForm] = useState(initialForm);

  const handleFormChange = (name: keyof typeof form, value: string) => {
    SetForm(prev => ({ ...prev, [name]: value.trimStart() }));
  };

  const isActiveButton =
    !form.title.trimStart() ||
    !form.imgUrl.trimStart() ||
    !form.imdbUrl.trimStart() ||
    !form.imdbId.trimStart();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (isActiveButton) {
      return;
    }

    onAdd({ ...form });

    SetForm(initialForm);
    setCount(count + 1);
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={form.title}
        onChange={e => handleFormChange('title', e)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={form.description}
        onChange={e => handleFormChange('description', e)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={form.imgUrl}
        onChange={e => handleFormChange('imgUrl', e)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={form.imdbUrl}
        onChange={e => handleFormChange('imdbUrl', e)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={form.imdbId}
        onChange={e => handleFormChange('imdbId', e)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isActiveButton}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
