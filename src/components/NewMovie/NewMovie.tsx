import React, { useState } from 'react';
import './NewMovie.scss';

type Props = {
  addMovie: (movie: Movie) => void
};

export const NewMovie: React.FC<Props> = ({ addMovie }) => {
  const [valueTitle, setValueTitle] = useState('');
  const [valueDescription, setValueDescription] = useState('');
  const [valueImgUrl, setValueImgUrl] = useState('');
  const [valueImdbUrl, setValueImdbUrl] = useState('');
  const [valueImdbId, setValueImdbId] = useState('');

  const [errorTitle, setErrorTitle] = useState('');
  const [errorImgUrl, setErrorImgUrl] = useState('');
  const [errorImdbUrl, setErrorImdbUrl] = useState('');
  const [errorImdbId, setErrorImdbId] = useState('');

  // eslint-disable-next-line max-len
  const [regex] = useState(/^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/);

  const chechRegex = (url: string) => (
    !regex.test(url)
  );

  const callAdd = (newMovie: Movie) => {
    addMovie(newMovie);

    setValueTitle('');
    setValueDescription('');
    setValueImgUrl('');
    setValueImdbUrl('');
    setValueImdbId('');
  };

  const onAdd = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newMovie = {
      title: valueTitle,
      description: valueDescription,
      imgUrl: valueImgUrl,
      imdbUrl: valueImdbUrl,
      imdbId: valueImdbId,
    };

    if (!valueTitle) {
      setErrorTitle('You forgot to enter a title');
    }

    if (!valueImgUrl) {
      setErrorImgUrl('You forgot to enter a ImgUrl');
    }

    if (!valueImdbUrl) {
      setErrorImdbUrl('You forgot to enter a ImdbUrl');
    }

    if (!valueImdbId) {
      setErrorImdbId('You forgot to enter a ImdbIdl');
    }

    if (valueImgUrl && chechRegex(valueImgUrl)) {
      setErrorImgUrl('Enter a correct ImgUrl');
    }

    if (valueImdbUrl && chechRegex(valueImdbUrl)) {
      setErrorImdbUrl('Enter a correct ImdbUrl');
    }

    if (valueImdbId && chechRegex(valueImdbId)) {
      setErrorImdbId('Enter a correct ImdbId');
    }

    if (valueTitle
      && !chechRegex(valueImgUrl)
      && !chechRegex(valueImdbUrl)
      && !chechRegex(valueImdbId)
    ) {
      callAdd(newMovie);
    }
  };

  return (
    <form onSubmit={onAdd}>
      <p className="title">Add your movie!</p>

      <input
        type="text"
        className="input"
        placeholder="Enter a title"
        value={valueTitle}
        onChange={(event) => {
          setValueTitle(event.currentTarget.value);
          setErrorTitle('');
        }}
      />
      {errorTitle && <p className="error">{errorTitle}</p>}

      <textarea
        className="textarea has-fixed-size"
        placeholder="Enter a description"
        value={valueDescription}
        onChange={(event) => {
          setValueDescription(event.currentTarget.value);
        }}
      />

      <input
        type="text"
        className="input"
        placeholder="Enter an imgUrl"
        value={valueImgUrl}
        onChange={(event) => {
          setValueImgUrl(event.currentTarget.value);
          setErrorImgUrl('');
        }}
      />
      {errorImgUrl && <p className="error">{errorImgUrl}</p>}

      <input
        type="text"
        className="input"
        placeholder="Enter an imdbUrl"
        value={valueImdbUrl}
        onChange={(event) => {
          setValueImdbUrl(event.currentTarget.value);
          setErrorImdbUrl('');
        }}
      />
      {errorImdbUrl && <p className="error">{errorImdbUrl}</p>}

      <input
        type="text"
        className="input"
        placeholder="Enter an imdbId"
        value={valueImdbId}
        onChange={(event) => {
          setValueImdbId(event.currentTarget.value);
          setErrorImdbId('');
        }}
      />
      {errorImdbId && <p className="error">{errorImdbId}</p>}

      <button
        type="submit"
        className="button is-link is-light"
      >
        Add
      </button>
    </form>
  );
};
