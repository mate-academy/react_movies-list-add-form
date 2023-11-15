import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (newMovie: Movie) => void
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);

  const [newMovie, setNewMovie] = useState<Movie>({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;

    setNewMovie((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const hasErrors = Object.entries(newMovie)
    .filter(([name]) => name !== 'description')
    .some(([, value]) => !(value.trim()));

  const reset = () => {
    setCount(((prevCount) => prevCount + 1));

    Object.entries(newMovie).forEach(([name]) => {
      setNewMovie((prevState) => ({
        ...prevState,
        [name]: '',
      }));
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (hasErrors) {
      return;
    }

    onAdd(newMovie);

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
            disabled={hasErrors}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
