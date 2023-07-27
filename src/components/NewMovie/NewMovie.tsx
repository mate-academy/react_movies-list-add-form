import React, { useState } from 'react';
import { Movie } from '../../types/Movie';
import { TextField } from '../TextField';
import { pattern } from '../Service/RegularFunction';

const initialMovieState: Movie = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [movie, setMovie] = useState<Movie>(initialMovieState);
  const handleMovieChange = (event: React.ChangeEvent<HTMLInputElement>,
    key: string) => {
    setMovie(prevMovie => ({ ...prevMovie, [key]: event.target.value }));
  };

  const isFormValid = (newMovie: Movie): boolean => {
    if (!newMovie.title.trim() || !newMovie.imgUrl.trim()
    || !newMovie.imdbId.trim() || !newMovie.imdbUrl.trim()) {
      return false;
    }

    if ((!newMovie.imgUrl.match(pattern) && newMovie.imgUrl !== '')
    || (!newMovie.imdbUrl.match(pattern) && newMovie.imdbUrl !== '')) {
      return false;
    }

    return true;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!isFormValid(movie)) {
      return;
    }

    onAdd(movie);
    setCount(prev => prev + 1);
    setMovie(initialMovieState);
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
        value={movie.title}
        required
        onChange={event => handleMovieChange(event, 'title')}
      />

      <TextField
        name="description"
        label="Description"
        value={movie.description}
        onChange={event => handleMovieChange(event, 'description')}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movie.imgUrl}
        required
        onChange={event => handleMovieChange(event, 'imgUrl')}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movie.imdbUrl}
        required
        onChange={event => handleMovieChange(event, 'imdbUrl')}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movie.imdbId}
        required
        onChange={event => handleMovieChange(event, 'imdbId')}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isFormValid(movie)}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
