import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (newMovie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [newMovie, setNewMovie] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const [count, setCount] = useState(0);

  // eslint-disable-next-line operator-linebreak
  const disabledButton =
    // eslint-disable-next-line operator-linebreak
    !newMovie.title.trim() ||
    // eslint-disable-next-line operator-linebreak
    !newMovie.imgUrl.trim() ||
    // eslint-disable-next-line operator-linebreak
    !newMovie.imdbUrl.trim() ||
    !newMovie.imdbId.trim();

  const reset = () => {
    setNewMovie({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    onAdd(newMovie);

    setCount(cur => cur + 1);

    reset();
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        newMovie={newMovie}
        onChange={setNewMovie}
        required
      />

      <TextField
        name="description"
        label="Description"
        newMovie={newMovie}
        onChange={setNewMovie}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        newMovie={newMovie}
        onChange={setNewMovie}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        newMovie={newMovie}
        onChange={setNewMovie}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        newMovie={newMovie}
        onChange={setNewMovie}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={disabledButton}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
