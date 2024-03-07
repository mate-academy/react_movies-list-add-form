import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface Props {
  onAdd: (movie: Movie) => void;
}

const initialMovie = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [newMovie, setNewMovie] = useState<Movie>(initialMovie);
  const [count, setCount] = useState(0);

  const isReadyToSubmit =
    newMovie.title.trim() &&
    newMovie.imgUrl.trim() &&
    newMovie.imdbId.trim() &&
    newMovie.imdbUrl.trim();

  const handleChange = (key: string, value: string) => {
    setNewMovie({
      ...newMovie,
      [key]: value,
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (isReadyToSubmit) {
      onAdd(newMovie);
      setCount(prevCount => prevCount + 1);
      setNewMovie(initialMovie);
    }
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={newMovie.title}
        onChange={value => handleChange('title', value)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={newMovie.description}
        onChange={value => handleChange('description', value)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={newMovie.imgUrl}
        onChange={value => handleChange('imgUrl', value)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newMovie.imdbUrl}
        onChange={value => handleChange('imdbUrl', value)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={newMovie.imdbId}
        onChange={value => handleChange('imdbId', value)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isReadyToSubmit}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};

