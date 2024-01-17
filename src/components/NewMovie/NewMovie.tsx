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
  const [count, setCount] = useState(0);
  const [movieState, setMovieState] = useState({
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
    setCount((currentCount) => currentCount + 1);
    setMovieState({
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

  const {
    title,
    imgUrl,
    imdbUrl,
    imdbId,
  } = movieState;

  const isDisabled = !(title.trim() && imgUrl.trim()
    && imdbUrl.trim() && imdbId.trim()
    && isValidUrl(imgUrl) && isValidUrl(imdbUrl));

  const onChangeCallback = (key: string) => {
    return (newValue: string) => setMovieState({
      ...movieState,
      [key]: newValue,
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
        value={movieState.title}
        onChange={onChangeCallback('title')}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={movieState.description}
        onChange={onChangeCallback('description')}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movieState.imgUrl}
        onChange={onChangeCallback('imgUrl')}
        isValid={isValidUrl}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movieState.imdbUrl}
        onChange={onChangeCallback('imdbUrl')}
        isValid={isValidUrl}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movieState.imdbId}
        onChange={onChangeCallback('imdbId')}
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
