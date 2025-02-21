import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (newMovie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const initialMovieFields = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [resetTouched, setResetTouched] = useState(false);
  const [movie, setMovie] = useState(initialMovieFields);

  const { title, description, imgUrl, imdbUrl, imdbId } = movie;

  const isInputsFilled =
    Boolean(title) && Boolean(imgUrl) && Boolean(imdbUrl) && Boolean(imdbId);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onAdd(movie);
    setMovie(initialMovieFields);
    setResetTouched(true);
    setTimeout(() => setResetTouched(false), 0);
  };

  return (
    <form className="NewMovie" onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={newValue => setMovie({ ...movie, title: newValue })}
        required
        resetTouched={resetTouched}
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={newValue => setMovie({ ...movie, description: newValue })}
        resetTouched={resetTouched}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={newValue => setMovie({ ...movie, imgUrl: newValue })}
        required
        resetTouched={resetTouched}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={newValue => setMovie({ ...movie, imdbUrl: newValue })}
        required
        resetTouched={resetTouched}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={newValue => setMovie({ ...movie, imdbId: newValue })}
        required
        resetTouched={resetTouched}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isInputsFilled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
