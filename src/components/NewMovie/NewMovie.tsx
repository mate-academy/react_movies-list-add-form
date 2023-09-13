import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void
};

const defaultMovie = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [form, setForm] = useState(defaultMovie);

  const isAddButtonDisabled = !form.title || !form.imgUrl
    || !form.imdbUrl || !form.imdbId;

  const handleFormUpdate = (fieldName: string, newValue: string) => {
    setForm((prevForm) => {
      return {
        ...prevForm,
        [fieldName]: newValue.trimStart(),
      };
    });
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onAdd(form);
    setForm(defaultMovie);
    setCount((prevCount) => prevCount + 1);
  };

  return (
    <form className="NewMovie" key={count} onSubmit={onSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={form.title}
        onChange={(event) => handleFormUpdate('title', event)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={form.description}
        onChange={(event) => handleFormUpdate('description', event)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={form.imgUrl}
        required
        onChange={(event) => handleFormUpdate('imgUrl', event)}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={form.imdbUrl}
        required
        onChange={(event) => handleFormUpdate('imdbUrl', event)}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={form.imdbId}
        required
        onChange={(event) => handleFormUpdate('imdbId', event)}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isAddButtonDisabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
