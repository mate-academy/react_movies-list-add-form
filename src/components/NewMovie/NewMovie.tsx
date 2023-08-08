import React, { useState } from 'react';
import { Movie } from '../../types/Movie';
import { TextField } from '../TextField';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [movie, setMovie] = useState<Movie>({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const resetForm = () => {
    setCount(count + 1);

    setMovie({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  const isFilled = (
    !movie.title.trim()
    || !movie.imgUrl.trim()
    || !movie.imdbUrl.trim()
    || !movie.imdbId.trim()
  );

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (isFilled) {
      return;
    }

    onAdd(movie);

    resetForm();
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
        movie={movie}
        value={movie.title}
        onChange={setMovie}
        required
      />

      <TextField
        name="description"
        label="Description"
        movie={movie}
        value={movie.description}
        onChange={setMovie}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        movie={movie}
        value={movie.imgUrl}
        required
        onChange={setMovie}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        movie={movie}
        value={movie.imdbUrl}
        required
        onChange={setMovie}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        movie={movie}
        value={movie.imdbId}
        required
        onChange={setMovie}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isFilled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
