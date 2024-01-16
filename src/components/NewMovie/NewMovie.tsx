import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';
import { ValidURL } from '../../types/ValidURL';

interface Props {
  onAdd: (newMovie: Movie) => void;
}

export const NewMovie = (props: Props) => {
  const { onAdd } = props;

  const [count, setCount] = useState(0);

  const [movieTitle, setMovieTitle] = useState('');
  const [movieDescription, setMovieDescription] = useState('');
  const [movieImgURL, setMovieImgURL] = useState('');
  const [movieImdbURL, setMovieImdbURL] = useState('');
  const [movieImdbId, setMovieImdbId] = useState('');

  function isValidURL(url: string): ValidURL {
  // eslint-disable-next-line max-len
    const regex = new RegExp(/^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/);
    const check = regex.test(url);
    const result: ValidURL = {
      isValid: check,
      errorMessage: check ? 'OK' : 'Invalid URL',
    };

    return result;
  }

  function submitMovie() {
    const newMovie: Movie = {
      title: movieTitle,
      description: movieDescription,
      imgUrl: movieImgURL,
      imdbUrl: movieImdbURL,
      imdbId: movieImdbId,
    };

    onAdd(newMovie);
  }

  const canConfirm = movieTitle && movieImdbId
                     && isValidURL(movieImgURL).isValid
                     && isValidURL(movieImdbURL).isValid;

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={() => {
        submitMovie();
        setCount((currentCount) => currentCount + 1);
      }}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={movieTitle}
        onChange={setMovieTitle}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={movieDescription}
        onChange={setMovieDescription}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movieImgURL}
        onChange={setMovieImgURL}
        required
        // eslint-disable-next-line react/jsx-no-bind
        checkValid={isValidURL}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movieImdbURL}
        onChange={setMovieImdbURL}
        required
        // eslint-disable-next-line react/jsx-no-bind
        checkValid={isValidURL}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movieImdbId}
        onChange={setMovieImdbId}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!canConfirm}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
