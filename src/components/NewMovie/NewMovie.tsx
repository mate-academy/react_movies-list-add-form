import { useState } from 'react';
import './NewMovie.scss';

const initialMovie: Movie = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

type Props = {
  onAdd: (movie: Movie) => void
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [movie, setMovie] = useState(initialMovie);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMovie(state => ({
      ...state,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onAdd(movie);
    setMovie(initialMovie);
  };

  return (
    <form
      className="movie__form"
      onSubmit={handleSubmit}
    >
      <input
        name="title"
        className="movie__form-input"
        type="text"
        placeholder="title"
        value={movie.title}
        onChange={handleChange}
      />
      <input
        name="description"
        className="movie__form-input"
        type="text"
        placeholder="description"
        value={movie.description}
        onChange={handleChange}
      />
      <input
        name="imgUrl"
        className="movie__form-input"
        type="text"
        placeholder="imgUrl"
        value={movie.imgUrl}
        onChange={handleChange}
      />
      <input
        name="imdbUrl"
        className="movie__form-input"
        type="text"
        placeholder="imdbUrl"
        value={movie.imdbUrl}
        onChange={handleChange}
      />
      <input
        name="imdbId"
        className="movie__form-input"
        type="text"
        placeholder="imdbId"
        value={movie.imdbId}
        onChange={handleChange}
      />
      <button
        type="submit"
        className="movie__form-button"
      >
        Create new movie
      </button>
    </form>
  );
};
