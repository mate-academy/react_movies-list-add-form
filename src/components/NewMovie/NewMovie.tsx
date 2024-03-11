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
  const [initialMovie] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });
  const [movie, setMovie] = useState({ ...initialMovie });

  const increment = () => {
    setCount(prevCount => prevCount + 1);
  };

  const reset = () => {
    setMovie(initialMovie);
  };

  const isNotValid =
    movie.title.length === 0 ||
    movie.imgUrl.length === 0 ||
    movie.imdbUrl.length === 0 ||
    movie.imdbId.length === 0;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onAdd(movie);
    increment();
    reset();

    if (isNotValid) {
      // eslint-disable-next-line no-useless-return
      return;
    }
  };

  return (
    <form
      method="POST"
      className="NewMovie"
      key={count}
      onSubmit={handleSubmit}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={movie.title}
        onChange={value =>
          setMovie(prevState => ({
            ...prevState,
            title: value,
          }))
        }
        required
      />

      <TextField
        name="description"
        label="Description"
        value={movie.description}
        onChange={value =>
          setMovie(prevState => ({
            ...prevState,
            description: value,
          }))
        }
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movie.imgUrl}
        onChange={value =>
          setMovie(prevState => ({
            ...prevState,
            imgUrl: value,
          }))
        }
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movie.imdbUrl}
        onChange={value =>
          setMovie(prevState => ({
            ...prevState,
            imdbUrl: value,
          }))
        }
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movie.imdbId}
        onChange={value =>
          setMovie(prevState => ({
            ...prevState,
            imdbId: value,
          }))
        }
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isNotValid}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
