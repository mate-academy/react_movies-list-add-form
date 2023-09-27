import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';
import { pattern } from '../../pattern/pattern';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const defaultMovieFormField: Movie = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  const [count, setCount] = useState(0);
  const [newMovie, setNewMovie] = useState(defaultMovieFormField);

  const setMoviesValue = (value: string, field: string): void => {
    setNewMovie({ ...newMovie, [field]: value });
  };

  const emptyField = !newMovie.title.trim()
    || !newMovie.imgUrl.trim()
    || !newMovie.imdbUrl.trim()
    || !newMovie.imdbId.trim();

  const URLIsNotValid = !newMovie.imgUrl.match(pattern)
    || !newMovie.imdbUrl.match(pattern);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (emptyField || URLIsNotValid) {
      return;
    }

    setCount(count + 1);
    onAdd(newMovie);
    setNewMovie(defaultMovieFormField);
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={handleSubmit}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={newMovie.title}
        onChange={value => setMoviesValue(value, 'title')}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={newMovie.description}
        onChange={value => setMoviesValue(value, 'description')}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={newMovie.imgUrl}
        onChange={value => setMoviesValue(value, 'imgUrl')}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newMovie.imdbUrl}
        onChange={value => setMoviesValue(value, 'imdbUrl')}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={newMovie.imdbId}
        onChange={value => setMoviesValue(value, 'imdbId')}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={emptyField || URLIsNotValid}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
