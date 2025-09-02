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
  const moviesValues = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };
  const [movies, setMovies] = useState(moviesValues);

  const trimTitle = movies.title.trim();
  const trimDescription = movies.description.trim();
  const trimImgUrl = movies.imgUrl.trim();
  const trimImdbUrl = movies.imdbUrl.trim();
  const trimImdbId = movies.imdbId.trim();

  const isError = !trimTitle || !trimImgUrl || !trimImdbUrl || !trimImdbId;

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isError) {
      return;
    }

    onAdd({
      title: trimTitle,
      description: trimDescription,
      imgUrl: trimImgUrl,
      imdbUrl: trimImdbUrl,
      imdbId: trimImdbId,
    });

    setMovies(moviesValues);
    setCount(count + 1);
  }

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={movies.title}
        onChange={el =>
          setMovies(prev => ({
            ...prev,
            title: el,
          }))
        }
        required
      />

      <TextField
        name="description"
        label="Description"
        value={movies.description}
        onChange={el =>
          setMovies(prev => ({
            ...prev,
            description: el,
          }))
        }
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movies.imgUrl}
        onChange={el =>
          setMovies(prev => ({
            ...prev,
            imgUrl: el,
          }))
        }
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movies.imdbUrl}
        onChange={el =>
          setMovies(prev => ({
            ...prev,
            imdbUrl: el,
          }))
        }
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movies.imdbId}
        onChange={el =>
          setMovies(prev => ({
            ...prev,
            imdbId: el,
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
            disabled={isError}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
