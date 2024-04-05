import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};
export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);

  const initMovieForm = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };
  const [newMovie, setNewMovie] = useState(initMovieForm);

  const hendleNewMovieData = (newValue: string, fieldName: string) => {
    setNewMovie({
      ...newMovie,
      [fieldName]: newValue,
    });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onAdd(newMovie);
    setNewMovie(initMovieForm);
    setCount(count + 1);
  };

  const { description, ...otherValues } = newMovie;
  const disabledStatus = Object.values(otherValues)
    .some(value => !value.trim());

  return (
    <form className="NewMovie" key={count} onSubmit={onSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value=""
        onChange={hendleNewMovieData}
        required
      />

      <TextField
        name="description"
        label="Description"
        value=""
        onChange={hendleNewMovieData}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value=""
        required
        onChange={hendleNewMovieData}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value=""
        required
        onChange={hendleNewMovieData}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value=""
        required
        onChange={hendleNewMovieData}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={disabledStatus}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
