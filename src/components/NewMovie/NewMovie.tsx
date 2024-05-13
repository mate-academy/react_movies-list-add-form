import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

const newMoviesDefaultFields = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [newMovies, setNewMovies] = useState(newMoviesDefaultFields);

  const handleChange = (name: string, value: string) => {
    setNewMovies(prevstate => ({
      ...prevstate,
      [name]: value,
    }));
  };

  const resetMoviesForm = () => {
    setCount(prevcaunt => prevcaunt + 1);
    setNewMovies(newMoviesDefaultFields);
  };

  const isNotValid =
    newMovies.title.trim() === '' ||
    newMovies.imgUrl.trim() === '' ||
    newMovies.imdbUrl.trim() === '' ||
    newMovies.imdbId.trim() === '';

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (isNotValid) {
      return;
    }

    event.preventDefault();
    onAdd(newMovies);
    resetMoviesForm();
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={newMovies.title}
        onChange={handleChange}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={newMovies.description}
        onChange={handleChange}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={newMovies.imgUrl}
        onChange={handleChange}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newMovies.imdbUrl}
        onChange={handleChange}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={newMovies.imdbId}
        onChange={handleChange}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isNotValid}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
