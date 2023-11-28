import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (newMovie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [movie, setMovie] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const reset = () => {
    setMovie({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  const requiredFields = movie.title.trim()
    && movie.imgUrl.trim()
    && movie.imdbUrl.trim()
    && movie.imdbId.trim();

  const handleChange = (
    field: string,
    value: string,
  ) => {
    setMovie(currentMovie => ({
      ...currentMovie, [field]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!requiredFields) {
      return;
    }

    setCount(currentCount => currentCount + 1);
    reset();
    onAdd({ ...movie });
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
        value={movie.title}
        onChange={(newValue) => handleChange('title', newValue)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={movie.description}
        onChange={(newValue) => handleChange('description', newValue)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movie.imgUrl}
        onChange={(newValue) => handleChange('imgUrl', newValue)}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movie.imdbUrl}
        onChange={(newValue) => handleChange('imdbUrl', newValue)}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movie.imdbId}
        onChange={(newValue) => handleChange('imdbId', newValue)}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!requiredFields}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
