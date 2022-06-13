import React, { useState } from 'react';
import classnames from 'classnames';
import { Alert } from '@mui/material';
// import { Component } from 'react';

type Props = {
  newMovie:(movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ newMovie }) => {
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newImgUrl, setNewImgUrl] = useState('');
  const [newImdbUrl, setNewImdbUrl] = useState('');
  const [newImdbId, setImdbId] = useState('');

  const [newImgUrlError, setNewImgUrlError] = useState(false);
  const [newImdbUrlError, setNewImdbUrlError] = useState(false);
  const [newTitledError, setNewTitleError] = useState(false);
  const [newImdbIdError, setNewImdbIdError] = useState(false);

  // eslint-disable-next-line max-len
  const regex = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

  const handleEvent = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const movie = {
      title: newTitle,
      description: newDescription,
      imgUrl: newImgUrl,
      imdbUrl: newImdbUrl,
      imdbId: newImdbId,
    };

    setNewTitleError(!newTitle);
    setNewImdbIdError(!newImdbId);
    setNewImgUrlError(!regex.test(newImgUrl));
    setNewImdbUrlError(!regex.test(newImdbUrl));

    if (newTitle && newImdbId && regex.test(newImgUrl)
      && regex.test(newImdbUrl)) {
      newMovie(movie);

      setNewTitle('');
      setNewDescription('');
      setNewImgUrl('');
      setNewImdbUrl('');
      setImdbId('');
    }
  };

  return (
    <form
      onSubmit={handleEvent}
    >
      <p className="title is-2 has-text-link">Add a movie</p>

      {newTitledError && (
        <Alert severity="error">
          Please enter a title
        </Alert>
      )}

      <input
        type="text"
        className={classnames(
          'input', 'mb-4', 'is-link', {
            'is-danger': newTitledError,
          },
        )}
        placeholder="Add a title"
        value={newTitle}
        onChange={(event) => {
          const { value } = event.target;

          if (value.length > 0) {
            setNewTitle(value);
            setNewTitleError(false);
          } else {
            setNewTitle('');
            setNewTitleError(true);
          }
        }}
      />

      <input
        type="text"
        className="input mb-4 is-link"
        placeholder="Add description"
        value={newDescription}
        onChange={(event) => {
          setNewDescription(event.target.value);
        }}
      />

      {newImgUrlError && (
        <Alert severity="error">
          Please enter a valid imgUrl
        </Alert>
      )}

      <input
        type="text"
        className={classnames(
          'input', 'mb-4', 'is-link', {
            'is-danger': newImgUrlError,
          },
        )}
        placeholder="Add imgUrl"
        value={newImgUrl}
        onChange={(event) => {
          const { value } = event.target;

          setNewImgUrl(value);

          if (!value || !regex.test(value)) {
            setNewImgUrlError(true);
          } else {
            setNewImgUrlError(false);
          }
        }}
      />

      {newImdbUrlError && (
        <Alert severity="error">
          Please enter a valid imdbUrl
        </Alert>
      )}

      <input
        type="text"
        className={classnames(
          'input', 'mb-4', 'is-link', {
            'is-danger': newImdbUrlError,
          },
        )}
        placeholder="Add imdbUrl"
        value={newImdbUrl}
        onChange={(event) => {
          const { value } = event.target;

          setNewImdbUrl(value);

          if (!value || !regex.test(value)) {
            setNewImdbUrlError(true);
          } else {
            setNewImdbUrlError(false);
          }
        }}
      />

      {newImdbIdError && (
        <Alert severity="error">
          Please enter a imdbId
        </Alert>
      )}

      <input
        type="text"
        className={classnames(
          'input', 'mb-4', 'is-link', {
            'is-danger': newImdbIdError,
          },
        )}
        placeholder="Add imdbId"
        value={newImdbId}
        onChange={(event) => {
          const { value } = event.target;

          if (value.length > 0) {
            setImdbId(value);
            setNewImdbIdError(false);
          } else {
            setImdbId('');
            setNewImdbIdError(true);
          }
        }}
      />

      <button
        type="submit"
        disabled={!newTitle || !newImdbId
          || !regex.test(newImgUrl)
          || !regex.test(newImdbUrl)}
        className="button is-link"
      >
        Add movie
      </button>
    </form>
  );
};
