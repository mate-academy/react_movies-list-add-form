import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, newCount] = useState(0);
  const [title, newTitle] = useState('');
  const [description, newDescription] = useState('');
  const [imgUrl, newImgUrl] = useState('');
  const [imdbUrl, newImdbUrl] = useState('');
  const [imdbId, newImdbId] = useState('');

  const clearForm = () => {
    newTitle('');
    newDescription('');
    newImgUrl('');
    newImdbUrl('');
    newImdbId('');
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onAdd({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });

    newCount(prev => prev + 1);

    clearForm();
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={handleFormSubmit}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={newTitle}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={newDescription}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={newImgUrl}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={newImdbUrl}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={newImdbId}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={Boolean(!title || !imgUrl || !imdbId || !imdbUrl)}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
