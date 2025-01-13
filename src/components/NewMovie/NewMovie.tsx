import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const isFormValid =
    title.trim() && imgUrl.trim() && imdbUrl.trim() && imdbId.trim();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setCount(prev => prev + 1);

    onAdd({
      title,
      description,
      imgUrl: imgUrl,
      imdbUrl: imdbUrl,
      imdbId,
    });

    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={event => setTitle(event)}
        required
        data-cy="movie-title"
      />

      <TextField
        name="description"
        data-cy="movie-title"
        label="Description"
        value={description}
        onChange={event => setDescription(event)}
      />

      <TextField
        name="imgUrl"
        data-cy="movie-title"
        label="Image URL"
        value={imgUrl}
        required
        onChange={event => setImgUrl(event)}
      />

      <TextField
        name="imdbUrl"
        data-cy="movie-title"
        label="Imdb URL"
        value={imdbUrl}
        required
        onChange={event => setImdbUrl(event)}
      />

      <TextField
        name="imdbId"
        data-cy="movie-title"
        label="Imdb ID"
        value={imdbId}
        required
        onChange={event => setImdbId(event)}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isFormValid}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
