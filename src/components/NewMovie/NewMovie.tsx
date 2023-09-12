import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type MovieProps = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie = ({ onAdd }: MovieProps) => {
  const [count, setCount] = useState(0);
  const [movie, setMovie] = useState<Movie>({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const handleChange = (field: string, value: string) => {
    setMovie({ ...movie, [field]: value });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setCount(count + 1);
    onAdd(movie);
    setMovie({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  const isFormValid
  = movie.title.trim() !== ''
  && movie.imgUrl.trim() !== ''
  && movie.imdbUrl.trim() !== ''
  && movie.imdbId.trim() !== '';

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={movie.title}
        onChange={(event) => handleChange('title', event)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={movie.description}
        onChange={(event) => handleChange('description', event)}
        required
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movie.imgUrl}
        required
        onChange={(event) => handleChange('imgUrl', event)}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movie.imdbUrl}
        required
        onChange={(event) => handleChange('imdbUrl', event)}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movie.imdbId}
        required
        onChange={(event) => handleChange('imdbId', event)}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
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
