import { useState } from 'react';
import type { FC } from 'react';
import { TextField } from '../TextField';
import type { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export type ChangeFunction = (name: string, value: string) => void;

export const NewMovie: FC<Props> = ({ onAdd }) => {
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

  const {
    title,
    imgUrl,
    imdbUrl,
    imdbId,
  } = movie;

  const isFormValid = title && imgUrl && imdbUrl && imdbId;

  const onChange: ChangeFunction = (name: string, value: string) => {
    setMovie((prevMovie) => ({
      ...prevMovie,
      [name]: value,
    }));
  };

  const onSubmit = () => {
    onAdd(movie);
    setCount((prevCount) => prevCount + 1);
    setMovie({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  return (
    <form className="NewMovie" key={count} onSubmit={onSubmit}>
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
            disabled={!isFormValid}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
