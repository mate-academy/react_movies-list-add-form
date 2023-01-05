import { useEffect, useState } from 'react';
import { Movie } from '../../types/Movie';
import { TextField } from '../TextField';

type Props = {
  onAdd: (movie: Movie) => void
};

export const NewMovie = (props: Props) => {
  const [count, setCount] = useState(0);
  const [disabled, setDisabled] = useState(true);
  const { onAdd } = props;
  const [movieTitle, setMovieTitle] = useState('');
  const [movieDescription, setMovieDescription] = useState('');
  const [movieImageUrl, setMovieImageUrl] = useState('');
  const [movieImdbUrl, setMovieImdbUrl] = useState('');
  const [movieImdbId, setMovieImdbId] = useState('');

  const [movie, setMovie] = useState({
    title: movieTitle,
    description: movieDescription,
    imgUrl: movieImageUrl,
    imdbUrl: movieImdbUrl,
    imdbId: movieImdbId,
  });

  useEffect(() => {
    const newMovie = {
      title: movieTitle.trim(),
      description: movieDescription.trim(),
      imgUrl: movieImageUrl.trim(),
      imdbUrl: movieImdbUrl.trim(),
      imdbId: movieImdbId.trim(),
    };

    setMovie(newMovie);
    if (newMovie.title.length !== 0
      && newMovie.imgUrl.length !== 0
      && newMovie.imdbUrl.length !== 0
      && newMovie.imdbId.length !== 0
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [
    movieTitle,
    movieDescription,
    movieImageUrl,
    movieImdbUrl,
    movieImdbId,
    disabled,
  ]);

  const setMovieValues = () => {
    setCount((prevCount) => prevCount + 1);
    setMovieTitle('');
    setMovieDescription('');
    setMovieImageUrl('');
    setMovieImdbUrl('');
    setMovieImdbId('');
    setDisabled(true);
  };

  return (
    <form className="NewMovie" key={count}>
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
        value={movieImageUrl}
        onChange={setMovieImageUrl}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movieImdbUrl}
        onChange={setMovieImdbUrl}
        required
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
            disabled={disabled}
            onClick={(e) => {
              e.preventDefault();

              onAdd(movie);
              setMovieValues();
            }}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
