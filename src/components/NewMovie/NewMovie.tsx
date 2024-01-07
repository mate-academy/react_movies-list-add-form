import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (newMovie:Movie) => void,
};

export const NewMovie:React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [movieTitle, setMovieTitle] = useState('');
  const [movieDescription, setMovieDescription] = useState('');
  const [movieImageUrl, setMovieImageURL] = useState('');
  const [movieImdbUrl, setMovieImdbUrl] = useState('');
  const [movieImdbId, setMovieImdbId] = useState('');

  const newMovieData = movieTitle.trim() && movieImageUrl.trim()
  && movieImdbUrl.trim() && movieImdbId.trim();

  function clearForm() {
    setMovieTitle('');
    setMovieDescription('');
    setMovieImageURL('');
    setMovieImdbUrl('');
    setMovieImdbId('');
    setCount(prev => prev + 1);
  }

  function addMovie() {
    const newMovie:Movie = {
      title: movieTitle,
      description: movieDescription,
      imgUrl: movieImageUrl,
      imdbUrl: movieImdbUrl,
      imdbId: movieImdbId,
    };

    onAdd(newMovie);
  }

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={e => {
        e.preventDefault();
        addMovie();
        clearForm();
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
        value={movieImageUrl}
        onChange={setMovieImageURL}
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
            disabled={!newMovieData}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
