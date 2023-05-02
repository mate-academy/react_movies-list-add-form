import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface Props {
  onAdd: (movie: Movie) => void;
}

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [movie, setMovie] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const addNewMovie = (key: string, value: string) => {
    setMovie({
      ...movie,
      [key]: value,
    });
  };

  const handleSubmit = (event: React.FocusEvent<HTMLFormElement>) => {
    event.preventDefault();

    onAdd(movie);

    setMovie({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  const isButtonDisabled = (
    !movie.title.trim()
    || !movie.imgUrl.trim()
    || !movie.imdbUrl.trim()
    || !movie.imdbId.trim()
  );

  return (
    <form
      className="NewMovie"
      onSubmit={handleSubmit}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={movie.title}
        onChange={addNewMovie}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={movie.description}
        onChange={addNewMovie}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movie.imgUrl}
        onChange={addNewMovie}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movie.imdbUrl}
        onChange={addNewMovie}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movie.imdbId}
        onChange={addNewMovie}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isButtonDisabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
