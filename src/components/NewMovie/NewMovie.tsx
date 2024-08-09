import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface Props {
  onAdd: (newMovie: Movie) => void;
}

const DEFAULT_MOVIE: Movie = {
  imdbId: '',
  imdbUrl: '',
  imgUrl: '',
  description: '',
  title: '',
};

export const NewMovie = ({ onAdd }: Props) => {
  const [movie, setMovie] = useState<Movie>(DEFAULT_MOVIE);
  const [count, setCount] = useState<number>(0);

  const isFormValid = (): boolean =>
    [
      movie.title.trim(),
      movie.imgUrl.trim(),
      movie.imdbUrl.trim(),
      movie.imdbId.trim(),
    ].every(Boolean);

  const isValid = isFormValid();

  const resetForm = () => {
    setMovie(DEFAULT_MOVIE);
    setCount(0);
  };

  const handleChange = (field: keyof Movie) => (value: string) => {
    setMovie(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!isValid) {
      return;
    }

    onAdd(movie);
    setCount(count + 1);
    resetForm();
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={movie.title}
        onChange={handleChange('title')}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={movie.description}
        onChange={handleChange('description')}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movie.imgUrl}
        onChange={handleChange('imgUrl')}
        required
        errorMessage="Please, enter valid image URL"
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movie.imdbUrl}
        onChange={handleChange('imdbUrl')}
        required
        errorMessage="Please, enter valid image URL IMDB"
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movie.imdbId}
        onChange={handleChange('imdbId')}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isValid}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
