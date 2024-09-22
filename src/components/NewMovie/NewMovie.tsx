import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd?: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd = () => {} }) => {
  const [count, setCount] = useState(0);

  const initialMovieValue = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  const [movie, setMovie] = useState(initialMovieValue);

  const isFormValid = () => {
    if (
      movie.title.trim() !== '' &&
      movie.imdbUrl.trim() !== '' &&
      movie.imgUrl.trim() !== '' &&
      movie.imdbId.trim() !== ''
    ) {
      return true;
    }

    return false;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isFormValid()) {
      const newMovie = movie;

      onAdd(newMovie);
      setCount(count + 1);
      setMovie(initialMovieValue);
    }
  };

  return (
    <form className="NewMovie" onSubmit={handleSubmit} key={count}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={movie.title}
        onChange={newValue => {
          setMovie(prevMovie => ({
            ...prevMovie,
            title: newValue,
          }));
        }}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={movie.description}
        onChange={newValue => {
          setMovie(prevMovie => ({
            ...prevMovie,
            description: newValue,
          }));
        }}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movie.imgUrl}
        onChange={newValue => {
          setMovie(prevMovie => ({
            ...prevMovie,
            imgUrl: newValue,
          }));
        }}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movie.imdbUrl}
        onChange={newValue => {
          setMovie(prevMovie => ({
            ...prevMovie,
            imdbUrl: newValue,
          }));
        }}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movie.imdbId}
        onChange={newValue => {
          setMovie(prevMovie => ({
            ...prevMovie,
            imdbId: newValue,
          }));
        }}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isFormValid()}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
