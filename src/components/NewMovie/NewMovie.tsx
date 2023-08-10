import React, { useState } from 'react';
import { pattern } from '../../api/pattern';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);

  const initialMovieState = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };
  const [movie, setMovie] = useState<Movie>(initialMovieState);

  const addNewField = (field: string, value: string) => {
    setMovie(newMovie => ({
      ...newMovie,
      [field]: value,
    }));
  };

  const hasError = () => {
    return !movie.title.trim()
      || !movie.imgUrl.trim()
      || !movie.imdbUrl.trim()
      || !movie.imdbId.trim()
      || !pattern.test(movie.imgUrl)
      || !pattern.test(movie.imdbUrl);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (hasError()) {
      return;
    }

    onAdd(movie);

    setMovie(initialMovieState);
    setCount(count + 1);
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
        onChange={(value) => addNewField('title', value)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={movie.description}
        onChange={(value) => addNewField('description', value)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movie.imgUrl}
        onChange={(value) => addNewField('imgUrl', value)}
        required
        pattern={pattern}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movie.imdbUrl}
        onChange={(value) => addNewField('imdbUrl', value)}
        required
        pattern={pattern}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movie.imdbId}
        onChange={(value) => addNewField('imdbId', value)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={hasError()}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
