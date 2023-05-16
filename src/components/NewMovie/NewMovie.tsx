import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

const INITIAL_NEW_MOVIE = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

export const NewMovie: React.FunctionComponent<{
  onAdd: (movie: Movie) => void
}> = ({ onAdd }) => {
  const [count, setCount] = useState(0);

  const [newMovie, setNewMoview] = useState<Movie>(INITIAL_NEW_MOVIE);

  const handleChange = (
    { target }: React.ChangeEvent<HTMLInputElement>,
  ) => setNewMoview(prev => ({ ...prev, [target.name]: target.value }));

  const handleSubmit = () => {
    onAdd(newMovie);
    setNewMoview(INITIAL_NEW_MOVIE);
    setCount(prev => prev + 1);
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={newMovie.title}
        onChange={handleChange}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={newMovie.description}
        onChange={handleChange}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={newMovie.imgUrl}
        onChange={handleChange}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newMovie.imdbUrl}
        onChange={handleChange}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={newMovie.imdbId}
        onChange={handleChange}

      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            disabled={Object.values(newMovie).some(v => !v)}
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
