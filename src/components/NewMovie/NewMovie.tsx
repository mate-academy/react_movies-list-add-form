import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface NewMovieProps {
  onAdd: (formData: Movie) => void;
}

export const NewMovie: React.FC<NewMovieProps> = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    titles: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const [errors, setErrors] = useState({
    titles: false,
    description: false,
    imgUrl: false,
    imdbUrl: false,
    imdbId: false,
  });

  const handleBlur = (name: keyof typeof formData) => {
    if (name === 'titles' || name === 'imgUrl' || name === 'imdbUrl'
    || name === 'imdbId') {
      setFormData((prevData) => ({
        ...prevData,
        [name]: prevData[name].trim(),
      }));

      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: formData[name].trim() === '' || /^\s+$/.test(formData[name]),
      }));
    }
  };

  const handleInputChange = (name: keyof typeof formData, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const hasErrors = Object.keys(errors).some((name) => {
      if (name === 'titles' || name === 'imgUrl' || name === 'imdbUrl'
      || name === 'imdbId') {
        return formData[name].trim() === '' || /^\s+$/.test(formData[name]);
      }

      return false;
    });

    if (hasErrors) {
      return;
    }

    const newMovie: Movie = {
      title: formData.titles,
      description: formData.description,
      imgUrl: formData.imgUrl,
      imdbUrl: formData.imdbUrl,
      imdbId: formData.imdbId,
    };

    onAdd(newMovie);

    setFormData({
      titles: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });

    setErrors({
      titles: false,
      description: false,
      imgUrl: false,
      imdbUrl: false,
      imdbId: false,
    });
  };

  return (
    <form className="NewMovie" onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="titles"
        label="Title"
        value={formData.titles}
        onChange={(value) => handleInputChange('titles', value)}
        onBlur={() => handleBlur('titles')}
        error={errors.titles}
        data-cy="movie-title"
        required
      />

      <TextField
        name="description"
        label="Description"
        value={formData.description}
        onChange={(value) => handleInputChange('description', value)}
        error={errors.description}
        required
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={formData.imgUrl}
        onChange={(value) => handleInputChange('imgUrl', value)}
        error={errors.imgUrl}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={formData.imdbUrl}
        onChange={(value) => handleInputChange('imdbUrl', value)}
        error={errors.imdbUrl}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={formData.imdbId}
        onChange={(value) => handleInputChange('imdbId', value)}
        error={errors.imdbId}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={Object.values(errors).some(error => error)}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
