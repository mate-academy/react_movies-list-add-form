import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface Props {
  onAdd: (movie: Movie) => void;
}

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [form, setFormValue] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const isNotValid =
    !form.title || !form.imgUrl || !form.imdbUrl || !form.imdbId;

  const handleChange = (name: string, value: string) => {
    setFormValue(prevValue => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const handleReset = () => {
    setFormValue({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isNotValid) {
      return;
    }

    onAdd({
      title: form.title,
      description: form.description,
      imgUrl: form.imgUrl,
      imdbUrl: form.imdbUrl,
      imdbId: form.imdbId,
    });

    setCount(current => current + 1);
    handleReset();
  };

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
        required
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
            disabled={isNotValid}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
