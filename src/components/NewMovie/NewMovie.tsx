import { FormEvent, useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = { onAdd: (movie: Movie) => void };

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
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    onAdd(newMovie);

    reset();

    setCount((currentCount) => currentCount + 1);
  };

  const isButtonDisabled = !newMovie.title.trim()
  || !newMovie.imgUrl.trim()
  || !newMovie.imdbUrl.trim()
  || !newMovie.imdbId.trim();

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={newMovie}
        onChange={setNewMovie}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={newMovie}
        onChange={setNewMovie}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={newMovie}
        onChange={setNewMovie}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newMovie}
        onChange={setNewMovie}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={newMovie}
        onChange={setNewMovie}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            disabled={isButtonDisabled}
            type="submit"
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
