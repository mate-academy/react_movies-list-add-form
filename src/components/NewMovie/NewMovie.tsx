import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';
import { isValidHttpUrl } from '../../Helpers';

const initialFormData = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [formData, setFormData] = useState(initialFormData);

  const isRequired = formData.title.trim()
    && isValidHttpUrl(formData.imgUrl.trim())
    && isValidHttpUrl(formData.imdbUrl.trim())
    && formData.imdbId.trim();

  const clearForm = () => {
    setCount(current => current + 1);
    setFormData(initialFormData);
  };

  const newMovie = formData;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onAdd(newMovie);
    clearForm();
  };

  const handleFormData = (key: string, value: string) => {
    setFormData((currentFormData) => ({
      ...currentFormData,
      [key]: value,
    }));
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
        value={formData.title}
        onChange={(value) => handleFormData('title', value)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={formData.description}
        onChange={(value) => handleFormData('description', value)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={formData.imgUrl}
        onChange={(value) => handleFormData('imgUrl', value)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={formData.imdbUrl}
        onChange={(value) => handleFormData('imdbUrl', value)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={formData.imdbId}
        onChange={(value) => handleFormData('imdbId', value)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isRequired}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
