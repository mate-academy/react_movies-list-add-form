import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface NewMovieProps {
  onAdd: (movie: Movie) => void;
}

export const NewMovie = ({ onAdd }: NewMovieProps) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const initialValues = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };
  const [count, setCount] = useState(0);
  const [values, setValues] = useState(initialValues);

  const allRequiredFilled = [
    values.title,
    values.imgUrl,
    values.imdbUrl,
    values.imdbId,
  ].every(v => v.trim() !== '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!allRequiredFilled) {
      return;
    }

    onAdd(values);
    setValues(initialValues);
    setCount(prev => prev + 1);
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={values.title}
        onChange={newValue => setValues(prev => ({ ...prev, title: newValue }))}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={values.description}
        onChange={newValue =>
          setValues(prev => ({ ...prev, description: newValue }))
        }
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={values.imgUrl}
        onChange={newValue =>
          setValues(prev => ({ ...prev, imgUrl: newValue }))
        }
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={values.imdbUrl}
        onChange={newValue =>
          setValues(prev => ({ ...prev, imdbUrl: newValue }))
        }
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={values.imdbId}
        onChange={newValue =>
          setValues(prev => ({ ...prev, imdbId: newValue }))
        }
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!allRequiredFilled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
