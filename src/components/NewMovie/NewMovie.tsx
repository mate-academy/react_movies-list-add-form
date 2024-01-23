import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

const initialMovieState = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [movie, setMovie] = useState(initialMovieState);

  const handleInputChange = (key: string, value: string) => {
    setMovie(prevInputs => ({ ...prevInputs, [key]: value }));
  };

  const reset = () => {
    setMovie(initialMovieState);
  };

  const handleSubmit = (event:React.FormEvent) => {
    event.preventDefault();
    const trimmedTitle = movie.title.trim();

    if (!trimmedTitle) {
      setMovie(initialMovieState);

      return;
    }

    onAdd(movie);

    reset();
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
        onChange={handleInputChange}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={movie.description}
        onChange={handleInputChange}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movie.imgUrl}
        onChange={handleInputChange}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movie.imdbUrl}
        onChange={handleInputChange}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movie.imdbId}
        onChange={handleInputChange}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          {movie.title !== '' && movie.imgUrl !== ''
          && movie.imdbUrl !== '' && movie.imdbId !== ''
            ? (
              <button
                type="submit"
                data-cy="submit-button"
                className="button is-link"
              >
                Add
              </button>
            ) : (
              <button
                type="submit"
                data-cy="submit-button"
                className="button is-link"
                disabled
              >
                Add
              </button>
            )}
        </div>
      </div>
    </form>
  );
};
