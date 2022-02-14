import React, { useState } from 'react';
import './NewMovie.scss';
import className from 'classnames';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setimdbUrl] = useState('');
  const [imdbId, setimdbId] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrlDirty, setImgUrlDirty] = useState(false);
  const [errorImgUrl, setErrorImgUrl] = useState('Required field');
  const [imdbUrlDirty, setImdbUrlDirty] = useState(false);
  const [errorImdbUrl, setErrorImdbUrl] = useState('Required field');

  const clearForm = () => {
    setTitle('');
    setImgUrl('');
    setimdbId('');
    setimdbUrl('');
    setDescription('');
    setImgUrlDirty(false);
    setImdbUrlDirty(false);
  };

  const newMovie = {
    title,
    imgUrl,
    imdbUrl,
    imdbId,
    description,
  };

  const handleSubmit = () => {
    onAdd(newMovie);
    clearForm();
  };

  const urlHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    switch (event.target.name) {
      case 'imgUrl': setImgUrlDirty(true);
        break;
      case 'imdbUrl': setImdbUrlDirty(true);
        break;
      default: setImgUrlDirty(false);
        setImdbUrlDirty(false);
        break;
    }
  };

  const placeHandlerValidate = (
    event: React.ChangeEvent<HTMLInputElement>, state: (str: string) => void,
  ) => {
    const regExp = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

    if (!regExp.test(event.target.value.toLowerCase())) {
      state('Invalid input format');
    } else {
      state('');
    }
  };

  return (
    <form
      className="MoviesForm"
      onSubmit={(event) => {
        event.preventDefault();
        handleSubmit();
      }}
    >
      <h2 className="MoviesForm__title">Add movie</h2>
      <input
        className="MoviesForm__place"
        type="text"
        placeholder="Title"
        name="title"
        required
        value={title}
        onChange={event => setTitle(event.target.value)}
      />
      <input
        className={className('MoviesForm__place', { error: imgUrlDirty && errorImgUrl })}
        type="text"
        placeholder="Image URL"
        name="imgUrl"
        required
        value={imgUrl}
        onBlur={urlHandler}
        onChange={event => {
          setImgUrl(event.target.value);
          placeHandlerValidate(event, setErrorImgUrl);
        }}
      />
      {(imgUrlDirty && errorImgUrl) && <div style={{ color: 'red' }}>{errorImgUrl}</div>}
      <input
        className={className('MoviesForm__place', { error: imdbUrlDirty && errorImdbUrl })}
        type="text"
        placeholder="Link to movie"
        name="imdbUrl"
        required
        value={imdbUrl}
        onBlur={urlHandler}
        onChange={event => {
          setimdbUrl(event.target.value);
          placeHandlerValidate(event, setErrorImdbUrl);
        }}
      />
      {(imdbUrlDirty && errorImdbUrl) && <div style={{ color: 'red' }}>{errorImdbUrl}</div>}
      <input
        className="MoviesForm__place"
        type="text"
        placeholder="Id movie"
        name="imdbId"
        required
        value={imdbId}
        onChange={event => setimdbId(event.target.value)}
      />
      <textarea
        className="MoviesForm__place MoviesForm__place--description"
        placeholder="Add description"
        name="description"
        value={description}
        onChange={event => setDescription(event.target.value)}
      />
      <button
        type="submit"
        className="MoviesForm__button"
        disabled={!title
          || (imgUrlDirty && !!errorImgUrl)
          || (imdbUrlDirty && !!errorImdbUrl)
          || !imdbId}
      >
        Add movie
      </button>
    </form>
  );
};
