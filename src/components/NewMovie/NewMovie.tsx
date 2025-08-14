import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [form, setForm] = useState({
    title: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    description: '',
  });

  const areFieldsValid =
    form.title.trim() !== '' &&
    form.imgUrl.trim() !== '' &&
    form.imdbUrl.trim() !== '' &&
    form.imdbId.trim() !== '';

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!areFieldsValid) {
      return;
    }

    const newMovie: Movie = {
      title: form.title.trim(),
      imgUrl: form.imgUrl.trim(),
      imdbUrl: form.imdbUrl.trim(),
      imdbId: form.imdbId.trim(),
      description: form.description.trim(),
    };

    onAdd(newMovie);

    setForm({
      title: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
      description: '',
    });

    setCount(prev => prev + 1);
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={form.title}
        onChange={newValue =>
          setForm(prev => ({
            ...prev,
            title: newValue,
          }))
        }
        required
      />

      <TextField
        name="description"
        label="Description"
        value={form.description}
        onChange={newValue =>
          setForm(prev => ({
            ...prev,
            description: newValue,
          }))
        }
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={form.imgUrl}
        onChange={newValue =>
          setForm(prev => ({
            ...prev,
            imgUrl: newValue,
          }))
        }
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={form.imdbUrl}
        onChange={newValue =>
          setForm(prev => ({
            ...prev,
            imdbUrl: newValue,
          }))
        }
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={form.imdbId}
        onChange={newValue =>
          setForm(prev => ({
            ...prev,
            imdbId: newValue,
          }))
        }
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!areFieldsValid}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
