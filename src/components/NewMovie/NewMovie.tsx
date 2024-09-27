import React, { useState } from 'react';
import { TextField } from '../TextField/TextField';

export const NewMovie: React.FC = () => {
  const [movie, setMovie] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });
  const [isFormValid, setIsFormValid] = useState(false);

  const handleChange = (key: string, value: string) => {
    setMovie(prev => ({ ...prev, [key]: value }));
  };

  const validateForm = () => {
    const isValid =
      movie.title.trim() && movie.imgUrl.trim() && movie.imdbUrl.trim();

    setIsFormValid(isValid);
  };

  const handleBlur = () => {
    validateForm();
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (isFormValid) {
      // Clear form
      setMovie({
        title: '',
        description: '',
        imgUrl: '',
        imdbUrl: '',
        imdbId: '',
      });
      setIsFormValid(false);
    }
  };

  return (
    <form className="NewMovie" onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={movie.title}
        required
        onChange={value => handleChange('title', value)}
        onBlur={handleBlur}
      />

      <TextField
        name="description"
        label="Description"
        value={movie.description}
        onChange={value => handleChange('description', value)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movie.imgUrl}
        required
        onChange={value => handleChange('imgUrl', value)}
        onBlur={handleBlur}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movie.imdbUrl}
        required
        onChange={value => handleChange('imdbUrl', value)}
        onBlur={handleBlur}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movie.imdbId}
        onChange={value => handleChange('imdbId', value)}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className="button is-link"
            disabled={!isFormValid}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
