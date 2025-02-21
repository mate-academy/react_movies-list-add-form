import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface Props {
  onAdd: (Movie: Movie) => void;
}

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);

  const initialFormData = {
    description: '',
    title: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  const [formData, setFormData] = useState(initialFormData);

  const isSumbitDisabled =
    !formData.title ||
    !formData.imgUrl ||
    !formData.imdbUrl ||
    !formData.imdbId;

  function handleReset() {
    setFormData(initialFormData);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSumbitDisabled) {
      return;
    }

    const newMovie: Movie = {
      title: formData.title,
      description: formData.description,
      imgUrl: formData.imgUrl,
      imdbUrl: formData.imdbUrl,
      imdbId: formData.imdbId,
    };

    onAdd(newMovie);
    setCount(currentCount => currentCount + 1);

    handleReset();
  }

  function handleUpdateField(field: string, value: string) {
    setFormData({ ...formData, [field]: value });
  }

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit} noValidate>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={formData.title}
        onChange={handleUpdateField}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={formData.description}
        onChange={handleUpdateField}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={formData.imgUrl}
        onChange={handleUpdateField}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={formData.imdbUrl}
        onChange={handleUpdateField}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={formData.imdbId}
        onChange={handleUpdateField}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isSumbitDisabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
