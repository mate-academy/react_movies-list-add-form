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
  const [movieImdbUrl, setMovieImdbUrl] = useState('');
  const [movieImdbId, setMovieImdbId] = useState('');

  const isFormValid = () =>
    [movieTitle, movieImgUrl, movieImdbUrl, movieImdbId].every(
      fieldValue => fieldValue.trim() !== '',
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
        setMovieImdbUrl('');
        setMovieImdbId('');
        setCount(currentCount => currentCount + 1);
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
          setMovieImdbUrl(eventValue);
        }}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movieImdbId}
        onChange={eventValue => {
          setMovieImdbId(eventValue);
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
