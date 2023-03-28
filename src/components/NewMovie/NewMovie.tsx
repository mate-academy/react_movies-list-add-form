import { FormEvent, useState } from 'react';
import { Movie } from '../../types/Movie';
import { TextField } from '../TextField';

const INITIAL_STATE: Movie = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

type Props = {
  onAdd: (movie: Movie) => void,
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [movie, setMovie] = useState<Movie>(INITIAL_STATE);

  const handleChange = (field: string, newValue: string) => {
    setMovie({ ...movie, [field]: newValue });
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onAdd(movie);
    setMovie(INITIAL_STATE);
    setCount(count + 1);
  };

  const validateForm = () => {
    const {
      title, imgUrl, imdbId, imdbUrl,
    } = movie;

    return title.trim().length 
      && imgUrl.trim().length 
      && imdbId.trim().length 
      && imdbUrl.trim().length;
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
        onChange={handleChange}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={movie.description}
        onChange={handleChange}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movie.imgUrl}
        onChange={handleChange}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movie.imdbUrl}
        onChange={handleChange}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movie.imdbId}
        onChange={handleChange}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!validateForm()}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
