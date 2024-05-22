import { useState } from 'react';
import { TextField } from '../TextField';
import React from 'react';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [newMovie, setNewMovie] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const handleChange = (name: string, value: string) => {
    setNewMovie(prevMovie => ({ ...prevMovie, [name]: value }));
  };

  const visibleButton = !(
    newMovie.title.trim() &&
    newMovie.imgUrl.trim() &&
    newMovie.imdbUrl.trim() &&
    newMovie.imdbId.trim()
  );

  const reset = () => {
    setNewMovie({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
    setCount(currentCount => currentCount + 1);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (
      newMovie.title &&
      newMovie.imdbUrl &&
      newMovie.imgUrl &&
      newMovie.imdbId
    ) {
      reset();
      onAdd(newMovie);
    }
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={newMovie.title}
        onChange={event => handleChange('title', event)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={newMovie.description}
        onChange={event => handleChange('description', event)}
        required
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={newMovie.imgUrl}
        onChange={event => handleChange('imgUrl', event)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newMovie.imdbUrl}
        onChange={event => handleChange('imdbUrl', event)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={newMovie.imdbId}
        onChange={event => handleChange('imdbId', event)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={visibleButton}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};

export default NewMovie;
