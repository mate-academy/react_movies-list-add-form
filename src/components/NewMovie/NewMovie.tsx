import React, { useState } from 'react';
import { TextField } from '../TextField';
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

  const reset = () => {
    setNewMovie({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  const requiredFields = ['title', 'imgUrl', 'imdbUrl', 'imdbId'];

  const emptyTextfields = Object.entries(newMovie).some(([key, value]) => {
    return requiredFields.includes(key) && value.trim() == '';
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (emptyTextfields) {
      return;
    }

    onAdd(newMovie);
    reset();
    setCount(count + 1);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setNewMovie((prevMovie: Movie) => ({ ...prevMovie, [name]: value }));
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={newMovie.title}
        onChange={handleChange}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={newMovie.description}
        onChange={handleChange}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={newMovie.imgUrl}
        onChange={handleChange}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newMovie.imdbUrl}
        onChange={handleChange}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={newMovie.imdbId}
        onChange={handleChange}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={emptyTextfields}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
