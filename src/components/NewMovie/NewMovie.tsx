import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (newMovie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);

  const [changedTitle, setChangedTitle] = useState('');
  const [changedDescription, setChangedDescription] = useState('');
  const [changedImgUrl, setChangedImgUrl] = useState('');
  const [changedImdbUrl, setChangedImdbUrl] = useState('');
  const [changedImdbId, setChangedImdbId] = useState('');

  const submitCheck = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onAdd({
      title: changedTitle,
      description: changedDescription,
      imgUrl: changedImgUrl,
      imdbUrl: changedImdbUrl,
      imdbId: changedImdbId,
    });

    setChangedTitle('');
    setChangedDescription('');
    setChangedImgUrl('');
    setChangedImdbUrl('');
    setChangedImdbId('');
    setCount(count + 1);
  };

  return (
    <form className="NewMovie" key={count} onSubmit={submitCheck}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={changedTitle}
        onChange={setChangedTitle}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={changedDescription}
        onChange={setChangedDescription}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={changedImgUrl}
        onChange={setChangedImgUrl}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={changedImdbUrl}
        onChange={setChangedImdbUrl}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={changedImdbId}
        onChange={setChangedImdbId}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            disabled={
              changedTitle.trim() === '' ||
              changedImdbId.trim() === '' ||
              changedImdbUrl.trim() === '' ||
              changedImgUrl.trim() === ''
            }
            type="submit"
            data-cy="submit-button"
            className="button is-link"
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
