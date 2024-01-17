import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';
import { isValidURL } from '../../types/ValidURL';

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

  function reset() {
    setMovieDescription('');
    setMovieImdbId('');
    setMovieImdbURL('');
    setMovieTitle('');
    setMovieImgURL('');

    setCount((currentCount) => currentCount + 1);
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

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    submitMovie();
    reset();
  }

  const canConfirm = movieTitle
                     && movieImdbId
                     && isValidURL(movieImgURL).isValid
                     && isValidURL(movieImdbURL).isValid;

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
