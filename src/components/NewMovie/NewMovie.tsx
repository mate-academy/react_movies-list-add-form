import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface NewMovieProps {
  onAdd: (movie: Movie) => void;
}

const urlPattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;


export const NewMovie: React.FC<NewMovieProps> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);

  const [formData, setFormData] = useState<Movie>({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const handleFieldChange = (fieldName: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const newMovie = {
      title: formData.title,
      description: formData.description,
      imgUrl: formData.imgUrl,
      imdbUrl: formData.imdbUrl,
      imdbId: formData.imdbId,
    };

    onAdd(newMovie);

    setFormData({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });

    setCount(prev => prev + 1);
  }

  const isFormValid = () => {
    return (
      formData.title.trim() !== '' &&
      formData.imgUrl.trim() !== '' &&
      formData.imdbUrl.trim() !== '' &&
      formData.imdbId.trim() !== ''
    );
  };

  const validateUrl = (value: string): string | null => {
    return urlPattern.test(value) ? null : 'Invalid URL';
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={formData.title}
        onChange={value => handleFieldChange('title', value)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={formData.description}
        onChange={value => handleFieldChange('description', value)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={formData.imgUrl}
        onChange={value => handleFieldChange('imgUrl', value)}
        required
        validate={validateUrl}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={formData.imdbUrl}
        onChange={value => handleFieldChange('imdbUrl', value)}
        required
        validate={validateUrl}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={formData.imdbId}
        onChange={value => handleFieldChange('imdbId', value)}
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
