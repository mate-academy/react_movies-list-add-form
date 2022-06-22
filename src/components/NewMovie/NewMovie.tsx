import React, { useState } from 'react';
import './NewMovie.scss';

type Props = {
  onAdd: (newMovie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const [titleError, setTitleError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [imgUrlError, setImgUrlError] = useState(false);
  const [imdbUrlError, setImdbUrlError] = useState(false);
  const [imdbIdError, setImdbIdError] = useState(false);

  const newMovie = {
    title,
    description,
    imgUrl,
    imdbUrl,
    imdbId,
  };

  const checkInput = () => {
    if (!title) {
      setTitleError(true);
    }

    if (!description) {
      setDescriptionError(true);
    }

    if (!imgUrl) {
      setImgUrlError(true);
    }

    if (!imdbUrl) {
      setImdbUrlError(true);
    }

    if (!imdbId) {
      setImdbIdError(true);
    }
  };

  const handleClick = () => {
    checkInput();

    if (!title || !description || !imgUrl || !imdbUrl || !imdbId) {
      return;
    }

    onAdd(newMovie);
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  return (
    <form
      className="newMovie-form"
      onSubmit={(event) => event.preventDefault()}
    >
      <input
        className={
          titleError
            ? 'newMovie-form-item newMovie-error'
            : 'newMovie-form-item'
        }
        type="text"
        name="title"
        placeholder="Add title"
        value={title}
        onChange={(event) => {
          setTitle(event.target.value);
          setTitleError(false);
        }}
      />
      <textarea
        className={
          descriptionError
            ? 'newMovie-form-item newMovie-error'
            : 'newMovie-form-item'
        }
        name="description"
        placeholder="Add description"
        value={description}
        onChange={(event) => {
          setDescription(event.target.value);
          setDescriptionError(false);
        }}
      />
      <input
        className={
          imgUrlError
            ? 'newMovie-form-item newMovie-error'
            : 'newMovie-form-item'
        }
        type="text"
        name="imgUrl"
        placeholder="Add imgUrl"
        value={imgUrl}
        onChange={(event) => {
          setImgUrl(event.target.value);
          setImgUrlError(false);
        }}
      />
      <input
        className={
          imdbUrlError
            ? 'newMovie-form-item newMovie-error'
            : 'newMovie-form-item'
        }
        type="text"
        name="imdbUrl"
        placeholder="Add imdbUrl"
        value={imdbUrl}
        onChange={(event) => {
          setImdbUrl(event.target.value);
          setImdbUrlError(false);
        }}
      />
      <input
        className={
          imdbIdError
            ? 'newMovie-form-item newMovie-error'
            : 'newMovie-form-item'
        }
        type="text"
        name="imdbId"
        placeholder="Add imdbId"
        value={imdbId}
        onChange={(event) => {
          setImdbId(event.target.value);
          setImdbIdError(false);
        }}
      />
      <button
        className="button"
        type="button"
        onClick={handleClick}
      >
        Add
      </button>
    </form>
  );
};
