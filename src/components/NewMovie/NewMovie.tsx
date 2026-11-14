import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie = ({ onAdd }: Props) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const INITIAL_MOVIE: Movie = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };
  const [newMovie, setNewMovie] = useState<Movie>({
    ...INITIAL_MOVIE,
  });

  const isAddAvailable =
    newMovie.title.trim() !== '' &&
    newMovie.imgUrl.trim() !== '' &&
    newMovie.imdbUrl.trim() !== '' &&
    newMovie.imdbId.trim() !== '';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(newMovie);
    setNewMovie({
      ...INITIAL_MOVIE,
    });
    setCount(count + 1);
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        required
        value={newMovie.title}
        onChange={value => setNewMovie({ ...newMovie, title: value })}
      />

      <TextField
        name="description"
        label="Description"
        value={newMovie.description}
        onChange={value => setNewMovie({ ...newMovie, description: value })}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        required
        value={newMovie.imgUrl}
        onChange={value => setNewMovie({ ...newMovie, imgUrl: value })}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        required
        value={newMovie.imdbUrl}
        onChange={value => setNewMovie({ ...newMovie, imdbUrl: value })}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        required
        value={newMovie.imdbId}
        onChange={value => setNewMovie({ ...newMovie, imdbId: value })}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isAddAvailable}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
