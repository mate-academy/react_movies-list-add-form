import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface Props {
  onAdd: (movie: Movie) => void,
}

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const { 0: count, 1: setCount } = useState(0);

  const { 0: hasSomeError, 1: setHasSomeError } = useState(false);
  const { 0: movie, 1: setMovie } = useState<Movie>({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const canSubmit = movie.title.trim() && movie.imgUrl.trim()
    && movie.imdbUrl.trim() && movie.imdbId.trim() && !hasSomeError;

  const handleChange = (fieldName: keyof Movie, value: string) => {
    setMovie(prevMovie => ({
      ...prevMovie,
      [fieldName]: value,
    }));
  };

  const resetForm = () => {
    setMovie({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!canSubmit) {
      return;
    }

    const trimmedMovie = {
      title: movie.title.trim(),
      description: movie.description.trim(),
      imgUrl: movie.imgUrl.trim(),
      imdbUrl: movie.imdbUrl.trim(),
      imdbId: movie.imdbId.trim(),
    };

    onAdd(trimmedMovie);

    resetForm();

    setCount(prev => prev + 1);
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={handleFormSubmit}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={movie.title}
        onChange={(value) => handleChange('title', value)}
        required
        hasSomeError={setHasSomeError}
      />

      <TextField
        name="description"
        label="Description"
        value={movie.description}
        onChange={(value) => handleChange('description', value)}
        hasSomeError={setHasSomeError}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movie.imgUrl}
        onChange={(value) => handleChange('imgUrl', value)}
        hasSomeError={setHasSomeError}
        url
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movie.imdbUrl}
        onChange={(value) => handleChange('imdbUrl', value)}
        hasSomeError={setHasSomeError}
        url
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movie.imdbId}
        onChange={(value) => handleChange('imdbId', value)}
        hasSomeError={setHasSomeError}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!canSubmit}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
