import React, { useState } from 'react';

import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface Props {
  onAdd: (movie: Movie) => void;
}

export const NewMovie: React.FC<Props> = ({ onAdd = () => {} }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const defaultFields = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  const [count, setCount] = useState(0);
  const [formField, setFormField] = useState(defaultFields);

  const resetForm = () => {
    setFormField(defaultFields);
  };

  const handleFieldChange = (fieldName: string, value: string): void => {
    setFormField({ ...formField, [fieldName]: value });
  };

  const isFormValid = () => {
    return (
      formField.title.trim() !== ''
      && formField.imgUrl.trim() !== ''
      && formField.imdbUrl.trim() !== ''
      && formField.imdbId.trim() !== ''
    );
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (isFormValid()) {
      onAdd(formField);
      resetForm();
      setCount(prevCount => prevCount + 1);
    }
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
        value={formField.title}
        onChange={(value) => handleFieldChange('title', value)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={formField.description}
        onChange={(value) => handleFieldChange('description', value)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={formField.imgUrl}
        onChange={(value) => handleFieldChange('imgUrl', value)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={formField.imdbUrl}
        onChange={(value) => handleFieldChange('imdbUrl', value)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={formField.imdbId}
        onChange={(value) => handleFieldChange('imdbId', value)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isFormValid()}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
