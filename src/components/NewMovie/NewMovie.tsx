import { useState } from 'react';
import { TextField } from '../TextField';
import React from 'react';
import { Movie } from '../../types/Movie';

interface Props {
  onAdd: (movie: Movie) => void;
}

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const handleTextFieldChange = (name: string) => (value: string) => {
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formData.imgUrl || !formData.imdbUrl || !formData.imdbId) {
      return;
    }

    onAdd(formData);
    setFormData({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  return (
    <form className="NewMovie" onSubmit={handleSubmit}>
      <h2 className="title">Добавить фильм</h2>

      <TextField
        name="title"
        label="Name"
        value={formData.title}
        required={true}
        onChange={handleTextFieldChange('title')}
      />

      <TextField
        name="description"
        label="Description"
        value={formData.description}
        onChange={handleTextFieldChange('description')}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={formData.imgUrl}
        required={true}
        onChange={handleTextFieldChange('imgUrl')}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={formData.imdbUrl}
        required={true}
        onChange={handleTextFieldChange('imdbUrl')}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={formData.imdbId}
        required={true}
        onChange={handleTextFieldChange('imdbId')}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={
              !formData.title ||
              !formData.imdbId ||
              !formData.imdbUrl ||
              !formData.imgUrl
            }
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
