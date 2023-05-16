import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (NewMovie: Movie) => void
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const initMovie = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  const [newMovie, setNewMovie] = useState(initMovie);
  const handler = (name: string, value: string) => {
    setNewMovie(prevMovie => ({
      ...prevMovie,
      [name]: value.trim(),
    }));
  };

  const resetForm = () => {
    setNewMovie(initMovie);
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onAdd(newMovie);

    resetForm();
    setCount(prevCount => prevCount + 1);
  };

  const submitDisables = !newMovie.title.trim() || !newMovie.imgUrl.trim()
  || !newMovie.imdbUrl.trim() || !newMovie.imdbId.trim();

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={onSubmit}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={newMovie.title}
        onChange={handler}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={newMovie.description}
        onChange={handler}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={newMovie.imgUrl}
        onChange={handler}
        required

      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newMovie.imdbUrl}
        onChange={handler}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={newMovie.imdbId}
        onChange={handler}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={submitDisables}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
