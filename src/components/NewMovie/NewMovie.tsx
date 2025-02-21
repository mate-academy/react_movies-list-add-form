import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [movieDate, setMovieDate] = useState<Movie>({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });
  const [count, setCount] = useState(0);

  const handleMovieDate = (type: keyof Movie, value: string) => {
    setMovieDate(prevMovie => ({ ...prevMovie, [type]: value }));
  };

  const checkAddButton =
    !movieDate.title.trim() ||
    !movieDate.imgUrl.trim() ||
    !movieDate.imdbUrl.trim() ||
    !movieDate.imdbId.trim();

  const reset = () => {
    setMovieDate({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    onAdd(movieDate);

    setCount(currentCount => currentCount + 1);

    reset();
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={movieDate.title}
        onChange={value => handleMovieDate('title', value)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={movieDate.description}
        onChange={value => handleMovieDate('description', value)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movieDate.imgUrl}
        onChange={value => handleMovieDate('imgUrl', value)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movieDate.imdbUrl}
        onChange={value => handleMovieDate('imdbUrl', value)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movieDate.imdbId}
        onChange={value => handleMovieDate('imdbId', value)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={checkAddButton}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
