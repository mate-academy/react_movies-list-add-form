import { ChangeEvent, FC, FormEvent, useState } from 'react';

import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface Props {
  onAdd: (movie: Movie) => void;
}

const defaultMovieData = {
  title: '',
  description: '',
  imgUrl: '',
  imdbId: '',
  imdbUrl: '',
};

export const NewMovie: FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [newMovie, setNewMovie] = useState(defaultMovieData);
  const handleMovieChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setNewMovie({
      ...newMovie,
      [name]: value,
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onAdd(newMovie);
    setNewMovie(defaultMovieData);
    setCount(prev => prev + 1);
  };

  const isAddDisabled =
    !newMovie.title ||
    !newMovie.imgUrl ||
    !newMovie.imdbUrl ||
    !newMovie.imdbId;

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={newMovie.title}
        onChange={handleMovieChange}
        required
      />
      <TextField
        name="description"
        label="Description"
        value={newMovie.description}
        onChange={handleMovieChange}
      />
      <TextField
        name="imgUrl"
        label="Image URL"
        value={newMovie.imgUrl}
        onChange={handleMovieChange}
        required
      />
      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newMovie.imdbUrl}
        onChange={handleMovieChange}
        required
      />
      <TextField
        name="imdbId"
        label="Imdb ID"
        value={newMovie.imdbId}
        onChange={handleMovieChange}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            disabled={isAddDisabled}
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
