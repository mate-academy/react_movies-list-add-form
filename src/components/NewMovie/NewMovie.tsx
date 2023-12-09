import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

const defaultMovie: Movie = {
  title: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
  description: '',
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [movie, setMovie] = useState<Movie>(defaultMovie);

  const reset = () => {
    setMovie(defaultMovie);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    onAdd(movie);
    setCount(count + 1);

    reset();
  };

  const handleInputChange = (inputName: string) => {
    return (value: string) => setMovie({
      ...movie,
      [inputName]: value,
    });
  };

  const areAllRequiredFilled = movie.title.trim()
    && movie.imgUrl.trim()
    && movie.imdbUrl.trim()
    && movie.imdbId.trim();

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
        onChange={handleInputChange('title')}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={movie.description}
        onChange={handleInputChange('description')}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movie.imgUrl}
        onChange={handleInputChange('imgUrl')}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movie.imdbUrl}
        onChange={handleInputChange('imdbUrl')}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movie.imdbId}
        onChange={handleInputChange('imdbId')}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!areAllRequiredFilled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
