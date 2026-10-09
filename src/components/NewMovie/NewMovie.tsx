import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

const INITIAL_MOVIE: Movie = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [newMovie, setNewMovie] = useState<Movie>(INITIAL_MOVIE);

  const isFormValid =
    newMovie.title.trim().length === 0 ||
    newMovie.imgUrl.trim().length === 0 ||
    newMovie.imdbUrl.trim().length === 0 ||
    newMovie.imdbId.trim().length === 0;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isFormValid) {
      return;
    }

    onAdd(newMovie);

    setCount(prev => prev + 1);
    setNewMovie(INITIAL_MOVIE);
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={newMovie.title}
        onChange={newValue =>
          setNewMovie(prev => ({ ...prev, title: newValue }))
        }
        required
      />

      <TextField
        name="description"
        label="Description"
        value={newMovie.description}
        onChange={newValue =>
          setNewMovie(prev => ({ ...prev, description: newValue }))
        }
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={newMovie.imgUrl}
        onChange={newValue =>
          setNewMovie(prev => ({ ...prev, imgUrl: newValue }))
        }
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newMovie.imdbUrl}
        onChange={newValue =>
          setNewMovie(prev => ({ ...prev, imdbUrl: newValue }))
        }
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={newMovie.imdbId}
        onChange={newValue =>
          setNewMovie(prev => ({ ...prev, imdbId: newValue }))
        }
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isFormValid}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
