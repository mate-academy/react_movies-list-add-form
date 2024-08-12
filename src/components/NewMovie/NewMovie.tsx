import React, { useState } from 'react';

interface NewMovieProps {
  onAdd: (movie: Movie) => void;
}

interface Movie {
  title: string;
  description: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
}

export const NewMovie: React.FC<NewMovieProps> = ({ onAdd }) => {
  const [formFields, setFormFields] = useState<Movie>({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const [errors, setErrors] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormFields(prevFields => ({
      ...prevFields,
      [name]: value,
    }));
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    let error = '';

    if (!value.trim() && name !== 'description') {
      error = `${name.replace(/^\w/, c => c.toUpperCase())} is required.`;
    }

    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const isFormValid = (): boolean => {
    return (
      Object.values(errors).every(error => error === '') &&
      formFields.title.trim() !== '' &&
      formFields.imgUrl.trim() !== '' &&
      formFields.imdbUrl.trim() !== '' &&
      formFields.imdbId.trim() !== ''
    );
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (isFormValid()) {
      onAdd(formFields); // Call the onAdd callback with the form data
      setFormFields({
        title: '',
        description: '',
        imgUrl: '',
        imdbUrl: '',
        imdbId: '',
      }); // Clear the form fields after submission

      setErrors({
        title: '',
        description: '',
        imgUrl: '',
        imdbUrl: '',
        imdbId: '',
      });
    } else {
      alert('Please fill in all required fields');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={`field ${errors.title ? 'has-error' : ''}`}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          data-cy="movie-title"
          value={formFields.title}
          onChange={handleChange}
          onBlur={handleBlur}
          required
        />
        {errors.title && <span className="help is-danger">{errors.title}</span>}
      </div>

      <div className={`field ${errors.description ? 'has-error' : ''}`}>
        <label htmlFor="description">Description</label>
        <input
          id="description"
          name="description"
          type="text"
          data-cy="movie-description"
          value={formFields.description}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {/* Description might not need an error message, so no condition here */}
      </div>

      <div className={`field ${errors.imgUrl ? 'has-error' : ''}`}>
        <label htmlFor="imgUrl">Image URL</label>
        <input
          id="imgUrl"
          name="imgUrl"
          type="text"
          data-cy="movie-imgUrl"
          value={formFields.imgUrl}
          onChange={handleChange}
          onBlur={handleBlur}
          required
        />
        {errors.imgUrl && (
          <span className="help is-danger">{errors.imgUrl}</span>
        )}
      </div>

      <div className={`field ${errors.imdbUrl ? 'has-error' : ''}`}>
        <label htmlFor="imdbUrl">IMDb URL</label>
        <input
          id="imdbUrl"
          name="imdbUrl"
          type="text"
          data-cy="movie-imdbUrl"
          value={formFields.imdbUrl}
          onChange={handleChange}
          onBlur={handleBlur}
          required
        />
        {errors.imdbUrl && (
          <span className="help is-danger">{errors.imdbUrl}</span>
        )}
      </div>

      <div className={`field ${errors.imdbId ? 'has-error' : ''}`}>
        <label htmlFor="imdbId">IMDb ID</label>
        <input
          id="imdbId"
          name="imdbId"
          type="text"
          data-cy="movie-imdbId"
          value={formFields.imdbId}
          onChange={handleChange}
          onBlur={handleBlur}
          required
        />
        {errors.imdbId && (
          <span className="help is-danger">{errors.imdbId}</span>
        )}
      </div>

      <button type="submit" disabled={!isFormValid()} data-cy="submit-button">
        Add Movie
      </button>
    </form>
  );
};

export default NewMovie;
