import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void,
  count: number;
};

export const NewMovie: React.FC<Props> = ({ onAdd, count }) => {
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescrption] = useState('');
  const [newImgUrl, setNewImgUrl] = useState('');
  const [newImdbUrl, setNewImdbUrl] = useState('');
  const [newImdbId, setNewImdbId] = useState('');

  const isDisable = (
    !newTitle.trim() || !newImgUrl.trim()
    || !newImdbUrl.trim() || !newImdbId.trim());

  const addMovie = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    onAdd({
      title: newTitle,
      description: newDescription,
      imgUrl: newImgUrl,
      imdbUrl: newImdbUrl,
      imdbId: newImdbId,
    });
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
        onChange={setNewTitle}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={newDescription}
        onChange={setNewDescrption}
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
            disabled={isDisable}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
