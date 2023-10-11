import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const initialMovie = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };
  const [count, setCount] = useState(0);
  const [movie, setMovie] = useState<Movie>(initialMovie);

  const isAllFilled = movie.title.trim() !== ''
    && movie.imgUrl.trim() !== ''
    && movie.imdbUrl.trim() !== ''
    && movie.imdbId.trim() !== '';

  const isAnyErrors = !movie.title || !movie.imgUrl || !movie.imdbUrl
    || !movie.imdbId;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isAllFilled) {
      return;
    }

    onAdd(movie);
    setMovie(initialMovie);
    setCount(prevCount => prevCount + 1);
  };

  const handleInputChange = (value: string, name: string) => {
    setMovie({
      ...movie,
      [name]: value,
    });
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
        onChange={handleInputChange}
      />

      <TextField
        name="description"
        label="Description"
        value={movie.description}
        onChange={handleInputChange}
        required={false}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movie.imgUrl}
        onChange={handleInputChange}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movie.imdbUrl}
        onChange={handleInputChange}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movie.imdbId}
        onChange={handleInputChange}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isAnyErrors}
            aria-disabled={isAnyErrors}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
