import { useState } from 'react';
import { TextField } from '../TextField';

export const NewMovie = () => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count] = useState(0);
  const [movieTitle, setMovieTitle] = useState('');
  const [movieDescription, setMovieDescription] = useState('');
  const [movieImgUrl, setMovieImgUrl] = useState('');
  const [movieImdbUrl, setMovieImdbUrl] = useState('');
  const [movieImdbId, setMovieImdbId] = useState('');
  const isEveryRequiredDataProvided = movieTitle
    && movieImdbId && movieImdbUrl && movieImgUrl;

  return (
    <form className="NewMovie" key={count}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={movieTitle}
        onChange={(newData) => (
          setMovieTitle(newData)
        )}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={movieDescription}
        onChange={(newData) => (
          setMovieDescription(newData)
        )}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movieImgUrl}
        onChange={(newData) => (
          setMovieImgUrl(newData)
        )}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movieImdbUrl}
        onChange={(newData) => (
          setMovieImdbUrl(newData)
        )}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movieImdbId}
        onChange={(newData) => (
          setMovieImdbId(newData)
        )}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isEveryRequiredDataProvided}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
