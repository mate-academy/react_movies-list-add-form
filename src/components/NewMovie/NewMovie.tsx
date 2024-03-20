import React, { useState } from 'react';
import { isURLValid } from '../../helpers/validUrl/validUrl';
import { Movie } from '../../types/Movie';
import { TextField } from '../TextField';

export const NewMovie: React.FC<{ onAdd: (newMovie: Movie) => void }> = ({
  onAdd,
}) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);

  const [newMovie, setNewMovie] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewMovie(prevMovie => ({ ...prevMovie, [name]: value }));
  };

  const isButtonDisabled =
    !newMovie.title.trim() ||
    !newMovie.imgUrl.trim() ||
    !isURLValid(newMovie.imgUrl.trim()) ||
    !newMovie.imdbUrl.trim() ||
    !isURLValid(newMovie.imdbUrl.trim()) ||
    !newMovie.imdbId.trim();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setCount(count + 1);
    onAdd(newMovie);
    setNewMovie({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });

    return;
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
        label="IMDb URL"
        value={newMovie.imdbUrl}
        onChange={handleChange}
        required
      />

      <TextField
        name="imdbId"
        label="IMDb ID"
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
            disabled={isButtonDisabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
