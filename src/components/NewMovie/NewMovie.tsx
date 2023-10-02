import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  addMovie: (movie: Movie) => void
};
export const NewMovie:React.FC<Props> = ({ addMovie }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [movie, setMovie] = useState<Movie>({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const buttonDisablet = () => {
    if (movie.title.trim()
    && movie.imdbId.trim()
    && movie.imdbUrl.trim()
    && movie.imgUrl.trim()) {
      return false;
    }

    return true;
  };

  const resetFild = () => {
    setMovie({
      ...movie,
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    addMovie(movie);
    setCount(count + 1);
    resetFild();
  };

  return (
    <form
      className="NewMovie"
      onSubmit={handleSubmit}
      key={count}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={movie}
        onChange={setMovie}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={movie}
        onChange={setMovie}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movie}
        onChange={setMovie}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movie}
        onChange={setMovie}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movie}
        onChange={setMovie}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            disabled={buttonDisablet()}
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
