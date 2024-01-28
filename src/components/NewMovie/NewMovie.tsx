import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd:(newMovie:Movie) => void;
};

const initialMovieState = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

export const NewMovie:React.FC<Props> = ({ onAdd }) => {
  const [newMovie, setNewMovie] = useState(initialMovieState);
  const [count, setCount] = useState(0);

  const clearForm = () => {
    setNewMovie(initialMovieState);
    setCount((prevCount) => prevCount + 1);
  };

  const handleChange = (name:string) => (value:string) => {
    setNewMovie((prevMovie) => ({ ...prevMovie, [name]: value }));
  };

  const handleAddForm = (event:React.FormEvent) => {
    event.preventDefault();
    onAdd(newMovie);
    clearForm();
  };

  const isDisabled = !(
    newMovie.title.trim()
    && newMovie.imgUrl.trim()
    && newMovie.imdbUrl.trim()
    && newMovie.imdbId.trim()
  );

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={handleAddForm}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={newMovie.title}
        onChange={handleChange('title')}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={newMovie.description}
        onChange={handleChange('description')}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={newMovie.imgUrl}
        onChange={handleChange('imgUrl')}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newMovie.imdbUrl}
        onChange={handleChange('imdbUrl')}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={newMovie.imdbId}
        onChange={handleChange('imdbId')}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isDisabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
