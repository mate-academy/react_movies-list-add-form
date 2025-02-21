import React, { useState } from 'react';
import type { Movie } from '../../types/Movie';
import { TextField } from '../TextField';

type Props = {
  onAdd: (movie: Movie) => void;
};

/* eslint-disable */
const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;
/* eslint-enable */

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [initialMovie] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });
  const [movie, setMovie] = useState({ ...initialMovie });

  /* eslint-disable */

  const isFormNotValid =
    movie.title.trim().length <= 0 ||
    movie.imgUrl.trim().length <= 0 ||
    movie.imdbUrl.trim().length <= 0 ||
    movie.imdbId.trim().length <= 0 ||
    !pattern.test(movie.imgUrl.trim()) ||
    !pattern.test(movie.imdbUrl.trim());

  /* eslint-enable */

  const clear = () => {
    setMovie(initialMovie);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onAdd(movie);

    if (isFormNotValid) {
      return;
    }

    clear();

    setCount(prevState => prevState + 1);
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
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
        pattern={pattern}
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
        pattern={pattern}
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
            disabled={isFormNotValid}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
