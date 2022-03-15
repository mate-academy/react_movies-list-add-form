import React, { useState } from 'react';

type Props = {
  onAdd: (movie: Movie) => void
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [hasTitileError, setTitileError] = useState(false);

  const [description, setDescription] = useState('');

  const [imgUrl, setImgUrl] = useState('');
  const [hasImgUrlError, setImgUrlError] = useState(false);

  const [imdbUrl, setImdbUrl] = useState('');
  const [hasImdbUrlError, setImdbUrlError] = useState(false);

  const [imdbId, setImdbId] = useState('');
  const [hasImdbIdError, setImdbIdError] = useState(false);

  const clearInputs = () => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  const checkErrors = () => {
    setTitileError(!title);
    setImgUrlError(!imgUrl);
    setImdbUrlError(!imdbUrl);
    setImdbIdError(!imdbId);
  };

  const haldleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    checkErrors();

    if (title && imgUrl && imdbUrl && imdbId) {
      onAdd({
        title, description, imgUrl, imdbUrl, imdbId,
      });

      clearInputs();
    }
  };

  return (
    <form
      onSubmit={haldleSubmit}
    >
      <input
        type="text"
        placeholder="Title"
        className={hasTitileError ? 'error' : ''}
        value={title}
        onChange={(event) => {
          setTitle(event.target.value);
          setTitileError(false);
        }}
      />

      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(event) => {
          setDescription(event.target.value);
        }}
      />

      <input
        type="text"
        className={hasImgUrlError ? 'error' : ''}
        placeholder="Image URL"
        value={imgUrl}
        onChange={(event) => {
          setImgUrl(event.target.value);
          setImgUrlError(false);
        }}
      />

      <input
        type="text"
        className={hasImdbUrlError ? 'error' : ''}
        placeholder="IMDB URL"
        value={imdbUrl}
        onChange={(event) => {
          setImdbUrl(event.target.value);
          setImdbUrlError(false);
        }}
      />

      <input
        type="text"
        className={hasImdbIdError ? 'error' : ''}
        placeholder="IMDB Id"
        value={imdbId}
        onChange={(event) => {
          setImdbId(event.target.value);
          setImdbIdError(false);
        }}
      />

      <button type="submit">Add</button>
    </form>
  );
};
