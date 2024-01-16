import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

// eslint-disable-next-line max-len
const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

interface Props {
  onAdd: (movie: Movie) => void
}

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [movieState, setMovieState] = useState({
    count: '0',
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const isValidUrl = (url: string) => {
    return pattern.test(url);
  };

  const handleReset = () => {
    setMovieState({
      ...movieState,
      count: (+movieState.count + 1).toString(),
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onAdd(movieState);
    handleReset();
  };

  const isDisabled = !(movieState.title.trim() && movieState.imgUrl.trim()
    && movieState.imdbUrl.trim() && movieState.imdbId.trim());

  return (
    <form
      className="NewMovie"
      key={movieState.count}
      onSubmit={handleSubmit}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={movieState.title}
        onChange={(newValue) => setMovieState({
          ...movieState,
          title: newValue,
        })}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={movieState.description}
        onChange={(newValue) => setMovieState({
          ...movieState,
          description: newValue,
        })}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movieState.imgUrl}
        onChange={(newValue) => setMovieState({
          ...movieState,
          imgUrl: newValue,
        })}
        isValid={isValidUrl}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movieState.imdbUrl}
        onChange={(newValue) => setMovieState({
          ...movieState,
          imdbUrl: newValue,
        })}
        isValid={isValidUrl}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movieState.imdbId}
        onChange={(newValue) => setMovieState({
          ...movieState,
          imdbId: newValue,
        })}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isDisabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
