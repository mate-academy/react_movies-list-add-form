import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface Props {
  onAdd: (movie: Movie) => void;
}

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [movieTitle, setMovieTitle] = useState('');
  const [movieDescription, setMovieDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onAdd({
      title: movieTitle,
      description: movieDescription,
      imgUrl: imageUrl,
      imdbUrl,
      imdbId,
    });

    setCount(prev => prev + 1);
    setMovieTitle('');
    setMovieDescription('');
    setImageUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  const isButtonDisabled = !movieTitle || !imageUrl || !imdbId || !imdbUrl;

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
        value={imageUrl}
        onChange={setImageUrl}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={setImdbUrl}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={setImdbId}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isButtonDisabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
