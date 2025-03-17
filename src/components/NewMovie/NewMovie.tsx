import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (newMovie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [newMovies, setNewMovies] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setNewMovies(prevMovie => ({ ...prevMovie, [name]: value }));
  };

  const newMovieData =
    newMovies.title.trim() &&
    newMovies.imgUrl.trim() &&
    newMovies.imdbUrl.trim() &&
    newMovies.imdbId.trim();

  function addMovie() {
    onAdd(newMovies);
  }

  function clearForm() {
    setNewMovies({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
    setCount(prev => prev + 1);
  }

  const formOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addMovie();
    clearForm();
  };

  return (
    <form className="NewMovie" key={count} onSubmit={formOnSubmit}>
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
            disabled={!newMovieData}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
