import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

const initialMovieState: Movie = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [movie, setMovie] = useState<Movie>(initialMovieState);

  const handleChange = (field: keyof Movie, value: string) => {
    setMovie((prevMovie) => ({ ...prevMovie, [field]: value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    onAdd(movie);

    setCount((prevCount) => prevCount + 1);
    setMovie(initialMovieState);
  };

  const isFormValid
    = movie.title.trim() !== ''
    && movie.imgUrl.trim() !== ''
    && movie.imdbUrl.trim() !== ''
    && movie.imdbId.trim() !== '';

  return (
    <form onSubmit={handleSubmit} className="NewMovie" key={count}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={movie.title}
        onChange={(value) => handleChange('title', value)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={movie.description}
        onChange={(value) => handleChange('description', value)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movie.imgUrl}
        onChange={(value) => handleChange('imgUrl', value)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movie.imdbUrl}
        onChange={(value) => handleChange('imdbUrl', value)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movie.imdbId}
        onChange={(value) => handleChange('imdbId', value)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            disabled={!isFormValid}
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
