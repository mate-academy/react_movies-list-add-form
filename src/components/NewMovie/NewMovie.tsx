import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface NewMovieProps {
  onAdd: (movie: Movie) => void;
}

export const NewMovie: React.FC<NewMovieProps> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [movieTitle, setMovieTitle] = useState('');
  const [movieDescription, setMovieDescription] = useState('');
  const [movieImgUrl, setMovieImgUrl] = useState('');
  const [movieImdbUrl, setMovieImbdUrl] = useState('');
  const [movieImdbId, setMovieImbdId] = useState('');

  const isFormValid = () =>
    [movieTitle, movieImgUrl, movieImdbUrl, movieImdbId].every(
      s => s.trim() !== '',
    );

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={event => {
        event.preventDefault();

        if (!isFormValid()) {
          return;
        }

        const movie: Movie = {
          title: movieTitle,
          description: movieDescription,
          imgUrl: movieImgUrl,
          imdbUrl: movieImdbUrl,
          imdbId: movieImdbId,
        };

        onAdd(movie);

        setMovieTitle('');
        setMovieDescription('');
        setMovieImgUrl('');
        setMovieImbdUrl('');
        setMovieImbdId('');
        setCount(c => c + 1);
      }}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={movieTitle}
        onChange={eventValue => {
          setMovieTitle(eventValue);
        }}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={movieDescription}
        onChange={eventValue => {
          setMovieDescription(eventValue);
        }}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movieImgUrl}
        onChange={eventValue => {
          setMovieImgUrl(eventValue);
        }}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movieImdbUrl}
        onChange={eventValue => {
          setMovieImbdUrl(eventValue);
        }}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movieImdbId}
        onChange={eventValue => {
          setMovieImbdId(eventValue);
        }}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isFormValid()}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
