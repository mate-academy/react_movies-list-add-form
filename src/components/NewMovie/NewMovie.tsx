import { FormEventHandler, useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (newMovie: Movie) => void;
};

const initialMovieState: Movie = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

export const NewMovie = ({ onAdd }: Props) => {
  const [movie, setMovie] = useState<Movie>(initialMovieState);
  const [count, setCount] = useState(0);
  const urlPattern =
    // eslint-disable-next-line max-len
    /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

  const validateUrl = (value: string): string | null => {
    if (value.trim() === '') {
      return null;
    }

    if (!urlPattern.test(value)) {
      return 'Must be a valid URL.';
    }

    return null;
  };

  const isFormValid =
    movie.title.trim() !== '' &&
    movie.imgUrl.trim() !== '' &&
    movie.imdbUrl.trim() !== '' &&
    movie.imdbId.trim() !== '';

  const handleSubmit: FormEventHandler = event => {
    event.preventDefault();
    onAdd(movie);
    setMovie(initialMovieState);
    setCount(prev => prev + 1);
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={movie.title}
        onChange={newValue =>
          setMovie({
            ...movie,
            title: newValue,
          })
        }
        required
      />

      <TextField
        name="description"
        label="Description"
        value={movie.description}
        onChange={newValue =>
          setMovie({
            ...movie,
            description: newValue,
          })
        }
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movie.imgUrl}
        validate={validateUrl}
        onChange={newValue =>
          setMovie({
            ...movie,
            imgUrl: newValue,
          })
        }
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movie.imdbUrl}
        validate={validateUrl}
        onChange={newValue =>
          setMovie({
            ...movie,
            imdbUrl: newValue,
          })
        }
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movie.imdbId}
        onChange={newValue =>
          setMovie({
            ...movie,
            imdbId: newValue,
          })
        }
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
