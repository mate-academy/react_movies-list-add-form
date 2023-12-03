import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);

  const [movie, setMovie] = useState<Movie>({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const resetButton = () => (
    setMovie({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    })
  );

  const hasAllFields
    = movie.title.trim()
    && movie.imdbId.trim()
    && movie.imdbUrl.trim()
    && movie.imgUrl.trim();

  const handleChanges = (
    field: string,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => (
    setMovie(preMovie => ({ ...preMovie, [field]: event.target.value }))
  );

  const handleAdd = (event: React.FormEvent) => {
    event.preventDefault();

    if (!hasAllFields) {
      return;
    }

    setCount(prevCount => prevCount + 1);

    resetButton();

    onAdd({ ...movie });
  };

  return (
    <form className="NewMovie" key={count}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={movie.title}
        onChange={(event) => handleChanges('title', event)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={movie.description}
        onChange={(event) => handleChanges('description', event)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movie.imgUrl}
        onChange={(event) => handleChanges('imgUrl', event)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movie.imdbUrl}
        onChange={(event) => handleChanges('imdbUrl', event)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movie.imdbId}
        onChange={(event) => handleChanges('imdbId', event)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            onClick={handleAdd}
            disabled={!hasAllFields}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
