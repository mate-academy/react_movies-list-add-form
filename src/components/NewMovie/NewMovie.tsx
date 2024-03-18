import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';
import { hasInvalidField } from '../../functions';
import { patternURL } from '../../constants';
type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [newMovie, setNewMovie] = useState<Movie>({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  function reset() {
    setNewMovie({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  }

  const onSubmit = (e: React.FormEvent) => {
    setCount(oldCount => oldCount + 1);
    e.preventDefault();
    reset();
    onAdd(newMovie);
  };

  return (
    <form className="NewMovie" key={count} onSubmit={onSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={newMovie.title}
        setNewMovie={setNewMovie}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={newMovie.description}
        setNewMovie={setNewMovie}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={newMovie.imgUrl}
        setNewMovie={setNewMovie}
        pattern={patternURL}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newMovie.imdbUrl}
        setNewMovie={setNewMovie}
        pattern={patternURL}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={newMovie.imdbId}
        setNewMovie={setNewMovie}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={hasInvalidField(newMovie)}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
