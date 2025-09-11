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
  const [newMovie, setNewMovie] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });
  const reset = () => {
    setNewMovie({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });

    setCount(prevCount => prevCount + 1);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onAdd(newMovie);
    reset();
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={newMovie.title}
        onChange={value =>
          setNewMovie(prevMovie => ({ ...prevMovie, title: value }))
        }
        required
      />

      <TextField
        name="description"
        label="Description"
        value={newMovie.description}
        onChange={value =>
          setNewMovie(prevMovie => ({
            ...prevMovie,
            description: value,
          }))
        }
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={newMovie.imgUrl}
        onChange={value =>
          setNewMovie(prevMovie => ({ ...prevMovie, imgUrl: value }))
        }
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newMovie.imdbUrl}
        onChange={value =>
          setNewMovie(prevMovie => ({ ...prevMovie, imdbUrl: value }))
        }
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={newMovie.imdbId}
        onChange={value =>
          setNewMovie(prevMovie => ({ ...prevMovie, imdbId: value }))
        }
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            disabled={
              !newMovie.title.trim() ||
              !newMovie.imdbId.trim() ||
              !newMovie.imdbUrl.trim() ||
              !newMovie.imgUrl.trim()
            }
            data-cy="submit-button"
            className="button is-link"
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
