import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbId, setImdbId] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');

  const canAdd = !!title && !!imgUrl && !!imdbId && !!imdbUrl;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (canAdd) {
      setCount(count + 1);

      onAdd({
        title,
        description,
        imgUrl,
        imdbId,
        imdbUrl,
      });

      setTitle('');
      setDescription('');
      setImgUrl('');
      setImdbId('');
      setImdbUrl('');
    }
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={setTitle}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={setDescription}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imdbUrl}
        onChange={setImgUrl}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={setImdbId}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbId}
        onChange={setImdbUrl}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!canAdd}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
