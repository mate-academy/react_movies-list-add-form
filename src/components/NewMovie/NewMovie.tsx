import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (newValue: Movie) => void,
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [movieTitle, setMovieTitle] = useState('');
  const [movieDescription, setMovieDescription] = useState('');
  const [movieImgUrl, setMovieImgUrl] = useState('');
  const [movieImdbUrl, setMovieImdbUrl] = useState('');
  const [movieImdbId, setMovieImdbId] = useState('');
  const isEveryRequiredDataProvided = movieTitle
    && movieImdbId && movieImdbUrl && movieImgUrl;
  const newMovieData = {
    title: movieTitle,
    description: movieDescription,
    imgUrl: movieImgUrl,
    imdbUrl: movieImdbUrl,
    imdbId: movieImdbId,
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={(event) => {
        event.preventDefault();
        onAdd(newMovieData);
        setMovieTitle('');
        setMovieDescription('');
        setMovieImgUrl('');
        setMovieImdbUrl('');
        setMovieImdbId('');
        setCount((prevCount) => (prevCount + 1));
      }}
    >
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
