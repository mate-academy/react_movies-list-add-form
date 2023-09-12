import { useState } from 'react';
import { TextField } from '../TextField';

import { pattern } from '../../api/pattern';
import { Movie } from '../../types/Movie';

interface Props {
  onAdd: (movie: Movie) => void,
}

const EMPTY_MOVIE = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [movie, setMovie] = useState<Movie>(EMPTY_MOVIE);

  const addNewField = (field: string, value: string) => {
    setMovie(newMovie => ({
      ...newMovie,
      [field]: value,
    }));
  };

  const hasError = () => {
    return (
      !movie.title.trim()
    || !movie.imdbId.trim()
    || !movie.imdbUrl.trim()
    || !movie.imgUrl.trim()
    || !pattern.test(movie.imgUrl)
    || !pattern.test(movie.imdbUrl)
    );
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (hasError()) {
      return;
    }

    onAdd(movie);

    setMovie(EMPTY_MOVIE);
    setCount(count + 1);
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
        value={movie.title}
        onChange={(value) => addNewField('title', value)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={movie.description}
        onChange={(value) => addNewField('description', value)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movie.imgUrl}
        onChange={(value) => addNewField('imgUrl', value)}
        pattern={pattern}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movie.imdbUrl}
        onChange={(value) => addNewField('imdbUrl', value)}
        pattern={pattern}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movie.imdbId}
        onChange={(value) => addNewField('imdbId', value)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            onSubmit={handleSubmit}
            disabled={hasError()}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
