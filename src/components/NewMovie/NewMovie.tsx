import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

const initialMovieState = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [movie, setMovie] = useState(initialMovieState);
  const [count, setCount] = useState(0);

  const handleInputChange = (value: string, name: string) => {
    setMovie(prevMovie => ({ ...prevMovie, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onAdd(movie);
    setMovie(initialMovieState);
    setCount(prevCount => prevCount + 1);
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={movie.title}
        onChange={newValue => handleInputChange(newValue, 'title')}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={movie.description}
        onChange={newValue => handleInputChange(newValue, 'description')}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movie.imgUrl}
        onChange={newValue => handleInputChange(newValue, 'imgUrl')}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movie.imdbUrl}
        onChange={newValue => handleInputChange(newValue, 'imdbUrl')}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movie.imdbId}
        onChange={newValue => handleInputChange(newValue, 'imdbId')}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={
              !movie.title || !movie.imgUrl || !movie.imdbUrl || !movie.imdbId
            }
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
