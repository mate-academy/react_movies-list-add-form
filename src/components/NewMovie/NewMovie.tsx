import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (newMovie: Movie) => void
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

  const isFilled = !newMovie.title.trim()
    || !newMovie.imgUrl.trim()
    || !newMovie.imdbUrl.trim()
    || !newMovie.imdbId.trim();

  const reset = () => {
    setNewMovie(newMovie);
  };

  const handleChange = (name: string, value: string) => {
    setNewMovie((prevMovie) => ({ ...prevMovie, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onAdd({
      title: newMovie.title,
      description: newMovie.description,
      imgUrl: newMovie.imgUrl,
      imdbUrl: newMovie.imdbUrl,
      imdbId: newMovie.imdbId,
    });

    setCount(count + 1);

    reset();
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
        value={newMovie.title}
        onChange={(value) => handleChange('title', value)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={newMovie.description}
        onChange={(value) => handleChange('description', value)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={newMovie.imgUrl}
        onChange={(value) => handleChange('imgUrl', value)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newMovie.imdbUrl}
        onChange={(value) => handleChange('imdbUrl', value)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={newMovie.imdbId}
        onChange={(value) => handleChange('imdbId', value)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isFilled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
