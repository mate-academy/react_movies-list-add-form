import { useEffect, useState } from 'react';
import { TextField } from '../TextField';

export const NewMovie = (props: any) => {
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
    imageUrl: movieImageUrl,
    imdbUrl: movieImdbUrl,
    imdbId: movieImdbId,
  });

  useEffect(() => {
    setMovie(
      {
        title: movieTitle,
        description: movieDescription,
        imageUrl: movieImageUrl,
        imdbUrl: movieImdbUrl,
        imdbId: movieImdbId,
      },

    );
    if (movie.title.length !== 0
      && movie.imageUrl.length !== 0
      && movie.imdbUrl.length !== 0
      && movie.imdbId.length !== 0
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
        onChange={(event) => {
          setMovieImdbUrl(event);
        }}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movieImdbId}
        onChange={(event) => {
          setMovieImdbId(event);
        }}
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
              setCount((prevCount) => prevCount + 1);
              setMovieTitle('');
              setMovieDescription('');
              setMovieImageUrl('');
              setMovieImdbUrl('');
              setMovieImdbId('');
              setDisabled(true);
            }}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
