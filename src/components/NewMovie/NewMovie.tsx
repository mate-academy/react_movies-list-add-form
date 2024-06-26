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

  const disableButton = !Boolean(title && imdbId && imdbUrl && imgUrl);

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  const handleSubmitForm = (submitEvent: React.FormEvent) => {
    submitEvent.preventDefault();

    onAdd({
      title: title,
      description: description,
      imgUrl: imgUrl,
      imdbUrl: imdbUrl,
      imdbId: imdbId,
    });

    setCount(count + 1);
    resetForm();
  };

  return (
    <form onSubmit={handleSubmitForm} className="NewMovie" key={count}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={newTitle => {
          setTitle(newTitle);
        }}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={newDescription => {
          setDescription(newDescription);
        }}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={newImgUrl => {
          setImgUrl(newImgUrl);
        }}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={newImdbUrl => {
          setImdbUrl(newImdbUrl);
        }}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={newImdbId => {
          setImdbId(newImdbId);
        }}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={disableButton}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
