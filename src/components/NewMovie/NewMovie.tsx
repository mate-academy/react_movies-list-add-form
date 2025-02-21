import React, { useState } from 'react';
import { TextField } from '../TextField';
import classNames from 'classnames';

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
  const [movie, setMovie] = useState<Movie>({
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

    setMovie(prevMovie => ({
      ...prevMovie,
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
      movie.title.trim() !== '' &&
      movie.imgUrl.trim() !== '' &&
      movie.imdbUrl.trim() !== '' &&
      movie.imdbId.trim() !== ''
    );
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (isFormValid()) {
      onAdd(movie);
      setMovie({
        title: '',
        description: '',
        imgUrl: '',
        imdbUrl: '',
        imdbId: '',
      });

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
      <div className={classNames('field', { 'has-error': errors.title })}>
        <TextField
          name="title"
          value={movie.title}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.title}
          required
          data-cy="movie-title"
        />
      </div>

      <div className={classNames('field', { 'has-error': errors.description })}>
        <TextField
          name="description"
          value={movie.description}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.description}
          data-cy="movie-description"
        />
      </div>

      <div className={classNames('field', { 'has-error': errors.imgUrl })}>
        <TextField
          name="imgUrl"
          value={movie.imgUrl}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.imgUrl}
          required
          data-cy="movie-imgUrl"
        />
      </div>

      <div className={classNames('field', { 'has-error': errors.imdbUrl })}>
        <TextField
          name="imdbUrl"
          value={movie.imdbUrl}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.imdbUrl}
          required
          data-cy="movie-imdbUrl"
        />
      </div>

      <div className={classNames('field', { 'has-error': errors.imdbId })}>
        <TextField
          name="imdbId"
          value={movie.imdbId}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.imdbId}
          required
          data-cy="movie-imdbId"
        />
      </div>

      <button
        type="submit"
        className={classNames('button', { 'is-disabled': !isFormValid() })}
        disabled={!isFormValid()}
        data-cy="submit-button"
      >
        Add Movie
      </button>
    </form>
  );
};

export default NewMovie;
