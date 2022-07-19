import React, { SyntheticEvent, useState } from 'react';
import './NewMovie.scss';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const [errorImg, setErrorImg] = useState('');
  const [errorImdb, setErrorImdb] = useState('');
  // eslint-disable-next-line
  const regex = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/

  const fields = [title, imgUrl, imdbUrl, imdbId, !errorImg, !errorImdb];
  const isValid = () => {
    if (fields.every(field => field)) {
      return false;
    }

    return true;
  };

  const clear = () => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
    setErrorImg('');
    setErrorImdb('');
  };

  const submitHandler = (event: SyntheticEvent) => {
    event.preventDefault();
    const newMovie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    onAdd(newMovie);
    clear();
  };

  const blurHandler = (url: string, setUrl: (url:string) => void) => {
    if (!regex.test(url)) {
      setUrl('Invalid URL');
    } else {
      setUrl('');
    }
  };

  return (
    <form
      className="NewMovie"
      onSubmit={submitHandler}
    >
      <input
        type="text"
        name="title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="title"
        data-cy="form-title"
        required
        className="input"
      />

      <input
        type="text"
        name="description"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        placeholder="description"
        data-cy="form-description"
        className="input"
      />

      <input
        type="text"
        name="imgUrl"
        value={imgUrl}
        onChange={(event) => setImgUrl(event.target.value)}
        onBlur={() => blurHandler(imgUrl, setErrorImg)}
        placeholder="imgUrl"
        data-cy="form-imgUrl"
        required
        className={`input ${errorImg ? 'error' : ''}`}
      />

      {errorImg && (
        <p className="error-message">{errorImg}</p>
      )}

      <input
        type="text"
        name="imdbUrl"
        value={imdbUrl}
        onChange={(event) => setImdbUrl(event.target.value)}
        onBlur={() => blurHandler(imdbUrl, setErrorImdb)}
        placeholder="imdbUrl"
        data-cy="form-imdbUrl"
        required
        className={`input ${errorImdb ? 'error' : ''}`}
      />

      {errorImdb && (
        <p className="error-message">{errorImdb}</p>
      )}

      <input
        type="text"
        name="imdbId"
        value={imdbId}
        onChange={(event) => setImdbId(event.target.value)}
        placeholder="imdbId"
        data-cy="form-imdbId"
        required
        className="input"
      />

      <button
        type="submit"
        className="button"
        data-cy="form-submit-button"
        disabled={isValid()}
      >
        Submit
      </button>
    </form>
  );
};
