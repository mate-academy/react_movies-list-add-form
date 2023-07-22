import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);

  const [formFields, setFormFields] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const isReadyToSubmit = formFields.title && formFields.imgUrl
    && formFields.imdbUrl && formFields.imdbId;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    onAdd(formFields);

    setCount(currentCount => currentCount + 1);

    setFormFields({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
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
        value={formFields.title}
        onChange={value => setFormFields({
          ...formFields, title: value,
        })}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={formFields.description}
        onChange={value => setFormFields({
          ...formFields, description: value,
        })}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={formFields.imgUrl}
        onChange={value => setFormFields({
          ...formFields, imgUrl: value,
        })}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={formFields.imdbUrl}
        onChange={value => setFormFields({
          ...formFields, imdbUrl: value,
        })}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={formFields.imdbId}
        onChange={value => setFormFields({
          ...formFields, imdbId: value,
        })}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isReadyToSubmit && true}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
