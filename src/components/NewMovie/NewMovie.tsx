import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void,
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);

  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescrption] = useState('');
  const [newImgUrl, setNewImgUrl] = useState('');
  const [newImdbUrl, setNewImdbUrl] = useState('');
  const [newImdbId, setNewImdbId] = useState('');

  const isDisable = (!newTitle || !newImgUrl || !newImdbUrl || !newImdbId);

  const addMovie = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    onAdd({
      title: newTitle,
      description: newDescription,
      imgUrl: newImgUrl,
      imdbUrl: newImdbUrl,
      imdbId: newImdbId,
    });

    setCount(value => value + 1);

    setNewTitle('');
    setNewDescrption('');
    setNewImgUrl('');
    setNewImdbUrl('');
    setNewImdbId('');
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={addMovie}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={newTitle}
        onChange={(value) => setNewTitle(value)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={newDescription}
        onChange={(value) => setNewDescrption(value)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={newImgUrl}
        onChange={(value) => setNewImgUrl(value)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newImdbUrl}
        onChange={(value) => setNewImdbUrl(value)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={newImdbId}
        onChange={(value) => setNewImdbId(value)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isDisable}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
