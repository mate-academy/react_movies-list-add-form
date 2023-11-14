import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface Props {
  onAdd: (newMovie: Movie) => void;
}

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const reset = () => {
    setTitle('');
    setDescription('');
    setImdbId('');
    setImdbUrl('');
    setImgUrl('');
    setCount(currentCount => currentCount + 1);
  };

  const requiredFields = title && imgUrl && imdbUrl && imdbId;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!requiredFields) {
      return;
    }

    onAdd({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });

    reset();
  };

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
        required
        value={title}
        onChange={newTitle => setTitle(newTitle)}
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={newDesc => setDescription(newDesc)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        required
        value={imgUrl}
        onChange={newImgUrl => setImgUrl(newImgUrl)}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        required
        value={imdbUrl}
        onChange={newImdbUrl => setImdbUrl(newImdbUrl)}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        required
        value={imdbId}
        onChange={newImdbId => setImdbId(newImdbId)}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!requiredFields}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
