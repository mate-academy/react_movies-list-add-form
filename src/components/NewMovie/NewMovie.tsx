import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';
import { defaultMovie } from '../Constans/defaultMovie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [newMovie, setNewMovie] = useState<Movie>(defaultMovie);
  const [count, setCount] = useState(0);

  const handleInputChange = (field: keyof Movie) => (newValue: string) => {
    setNewMovie({
      ...newMovie,
      [field]: newValue.trim(),
    });
  };

  const hasEmptyField = Object.values(newMovie).some(value => value === '');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (hasEmptyField) {
      return;
    }

    onAdd(newMovie);
    setCount(currentCount => currentCount + 1);
    setNewMovie(defaultMovie);
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={newMovie.title}
        onChange={handleInputChange('title')}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={newMovie.description}
        onChange={handleInputChange('description')}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={newMovie.imgUrl}
        onChange={handleInputChange('imgUrl')}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newMovie.imdbUrl}
        onChange={handleInputChange('imdbUrl')}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={newMovie.imdbId}
        onChange={handleInputChange('imdbId')}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={hasEmptyField}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
