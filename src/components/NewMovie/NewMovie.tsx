import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

enum FormFields {
  title = 'Title',
  description = 'Description',
  imgUrl = 'Image URL',
  imdbUrl = 'Imdb URL',
  imdbId = 'Imdb ID',
}

type NewMovieProps = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<NewMovieProps> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);

  const initialFormData = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChangeSet = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const reset = () => {
    setFormData(initialFormData);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onAdd(formData);
    setCount(count + 1);
    reset();
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label={FormFields.title}
        value={formData.title}
        onChange={value => handleChangeSet('title', value)}
        required
      />

      <TextField
        name="description"
        label={FormFields.description}
        value={formData.description}
        onChange={value => handleChangeSet('description', value)}
      />

      <TextField
        name="imgUrl"
        label={FormFields.imgUrl}
        value={formData.imgUrl}
        onChange={value => handleChangeSet('imgUrl', value)}
        required
      />

      <TextField
        name="imdbUrl"
        label={FormFields.imdbUrl}
        value={formData.imdbUrl}
        onChange={value => handleChangeSet('imdbUrl', value)}
        required
      />

      <TextField
        name="imdbId"
        label={FormFields.imdbId}
        value={formData.imdbId}
        onChange={value => handleChangeSet('imdbId', value)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={
              !formData.title ||
              !formData.imgUrl ||
              !formData.imdbUrl ||
              !formData.imdbId
            }
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
