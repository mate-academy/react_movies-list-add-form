import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from './../../types/Movie';

type Props = {
  movies: Movie[];
  setMovies: (movies: Movie[]) => void;
};

export const NewMovie = ({ movies, setMovies }: Props) => {
  const initialMovie: Movie = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };
  const [count, setCount] = useState(0);
  const [movie, setMovie] = useState<Movie>(initialMovie);
  let disabledBtn = true;

  const addMovie = (event: React.FormEvent) => {
    event.preventDefault();

    setCount(prevCount => prevCount + 1);
    setMovies([...movies, movie]);
    setMovie(initialMovie);
  };

  if (
    movie.title !== '' &&
    movie.imgUrl !== '' &&
    movie.imdbId !== '' &&
    movie.imdbUrl !== ''
  ) {
    disabledBtn = false;
  } else {
    disabledBtn = true;
  }

  return (
    <form className="NewMovie" key={count} onSubmit={addMovie}>
      <h2 className="title">Add a movie</h2>
      <TextField
        name="title"
        label="Title"
        value={movie.title}
        onChange={val =>
          setMovie({
            ...movie,
            title: val.trim(),
          })
        }
        required
      />

      <TextField
        name="description"
        label="Description"
        value={movie.description}
        onChange={val =>
          setMovie({
            ...movie,
            description: val.trim(),
          })
        }
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movie.imgUrl}
        onChange={val =>
          setMovie({
            ...movie,
            imgUrl: val.trim(),
          })
        }
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movie.imdbUrl}
        onChange={val =>
          setMovie({
            ...movie,
            imdbUrl: val.trim(),
          })
        }
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movie.imdbId}
        onChange={val =>
          setMovie({
            ...movie,
            imdbId: val.trim(),
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
            disabled={disabledBtn}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
