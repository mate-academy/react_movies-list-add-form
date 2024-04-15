import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface Props {
  onAdd: (movie: Movie) => void;
}

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [movie, setMovie] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMovie(movies => ({
      ...movies,
      [event.target.name]: event.target.value,
    }));
  };

  const reset = () => {
    movie.title = '';
    movie.description = '';
    movie.imgUrl = '';
    movie.imdbUrl = '';
    movie.imdbId = '';
  };

  const spaceCheck = Object.entries(movie).some(
    ([key, value]) => value.trim().length === 0 && key !== 'description',
  );

  const inputIsDisabled =
    !movie.title || !movie.imgUrl || !movie.imdbUrl || !movie.imdbId;

  const isDisabled = (): boolean | undefined => {
    return spaceCheck || inputIsDisabled;
  };

  const handleSumbit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      ...movie,
    });

    reset();

    setCount(count + 1);
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSumbit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={movie.title}
        onChange={onChange}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={movie.description}
        onChange={onChange}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movie.imgUrl}
        onChange={onChange}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movie.imdbUrl}
        onChange={onChange}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movie.imdbId}
        onChange={onChange}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isDisabled()}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
