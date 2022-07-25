import React, { useEffect, useState } from 'react';
import { Movie } from '../../types/Movie';
import { TextField } from '../TextField';

type Props = {
  onAdd: (movie: Movie) => void,
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newImgUrl, setNewImgUrl] = useState('');
  const [newImdbUrl, setNewImdbUrl] = useState('');
  const [newImdbId, setNewImdbId] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    if (newTitle
      && newImgUrl
      && newImdbUrl
      && newImdbId) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  });

  const newMovie = {
    title: newTitle,
    description: newDescription,
    imgUrl: newImgUrl,
    imdbUrl: newImdbUrl,
    imdbId: newImdbId,
  };

  function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    onAdd(newMovie);
    setCount(state => state + 1);
    setNewTitle('');
    setNewDescription('');
    setNewImgUrl('');
    setNewImdbUrl('');
    setNewImdbId('');
  }

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={onSubmit}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={newTitle}
        onChange={setNewTitle}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={newDescription}
        onChange={setNewDescription}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={newImgUrl}
        onChange={setNewImgUrl}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newImdbUrl}
        onChange={setNewImdbUrl}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={newImdbId}
        onChange={setNewImdbId}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isDisabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
