import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

const isValidUrl = (url: string) => {
  // eslint-disable-next-line max-len
  const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

  return pattern.test(url);
};

type Props = {
  onAdd: (newMovie: Movie) => void,
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newImgUrl, setNewImgUrl] = useState('');
  const [newImdbUrl, setNewImdbUrl] = useState('');
  const [newImdbId, setNewImdbId] = useState('');

  const isValidImgUrl = isValidUrl(newImgUrl);
  const isValidImdbUrl = isValidUrl(newImdbUrl);

  const isSubmitButtonActive = () => (Boolean(
    newTitle.trim()
    && newImgUrl.trim()
    && newImdbUrl.trim()
    && newImdbId.trim(),
  ));

  const clearForm = () => {
    setNewTitle('');
    setNewDescription('');
    setNewImgUrl('');
    setNewImdbUrl('');
    setNewImdbId('');
  };

  const handleFormSubmit = () => {
    if (!isValidUrl(newImgUrl) || !isValidUrl(newImdbUrl)) {
      return;
    }

    const newMovie = {
      title: newTitle,
      description: newDescription,
      imgUrl: newImgUrl,
      imdbUrl: newImdbUrl,
      imdbId: newImdbId,
    };

    onAdd(newMovie);

    setCount((prevCount => prevCount + 1));

    clearForm();
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={(event) => {
        event.preventDefault();
        handleFormSubmit();
      }}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={newTitle}
        required
        onChange={(value: string) => setNewTitle(value)}
      />

      <TextField
        name="description"
        label="Description"
        value={newDescription}
        onChange={(value: string) => setNewDescription(value)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={newImgUrl}
        required
        onChange={(value: string) => setNewImgUrl(value)}
        isValidUrl={isValidImgUrl}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newImdbUrl}
        required
        onChange={(value: string) => setNewImdbUrl(value)}
        isValidUrl={isValidImdbUrl}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={newImdbId}
        required
        onChange={(value: string) => setNewImdbId(value)}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isSubmitButtonActive()}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
