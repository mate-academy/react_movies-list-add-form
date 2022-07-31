import 'bulma/css/bulma.min.css';
import { Button } from 'react-bulma-components';
import React, { FC, useState } from 'react';
import { Movie } from '../../types/Movie';
import { TextField } from '../TextField';

type Props = {
  onAdd: (movie: Movie) => void,
};

export const NewMovie: FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);

  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newImgUrl, setNewImgUrl] = useState('');
  const [newImdbUrl, setNewImdbUrl] = useState('');
  const [newImdbId, setNewImdbId] = useState('');

  const ghost = newTitle && newImgUrl && newImdbUrl && newImdbId;

  const hundleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const newMovie = {
      title: newTitle,
      description: newDescription,
      imgUrl: newImgUrl,
      imdbUrl: newImdbUrl,
      imdbId: newImdbId,
    };

    if (ghost) {
      onAdd(newMovie);
      setCount((a) => (a + 1));
      setNewTitle('');
      setNewDescription('');
      setNewImgUrl('');
      setNewImdbUrl('');
      setNewImdbId('');
    }
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={(event) => hundleSubmit(event)}
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
        required
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
          <Button
            type="submit"
            data-cy="submit-button"
            className="button is-link is-outlined"
            disabled={!newTitle || !newImgUrl || !newImdbUrl || !newImdbId}
            color="red"
            rounded
          >
            Add
          </Button>
        </div>
      </div>
    </form>
  );
};
