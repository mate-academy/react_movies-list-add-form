import React, { useState } from 'react';
import './NewMovie.scss';
import className from 'classnames';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [state, setState] = useState({
    title: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    description: '',
  });

  const clearForm = () => {
    setState({
      title: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
      description: '',
    });
  };

  const {
    title,
    imgUrl,
    imdbUrl,
    imdbId,
    description,
  } = state;

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

  const [imgUrlDirty, setImgUrlDirty] = useState(false);
  const [errorImgUrl, setErrorImgUrl] = useState('Required field');
  const [imdbUrlDirty, setImdbUrlDirty] = useState(false);
  const [errorImdbUrl, setErrorImdbUrl] = useState('Required field');

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

  const regExp = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

  const placeHandlerValidate = (
    event: React.ChangeEvent<HTMLInputElement>,
    setErrorMessage: React.Dispatch<React.SetStateAction<string>>,
  ): void | undefined => {
    if (!regExp.test(event.target.value.toLowerCase())) {
      setErrorMessage('Not validate format');
    } else {
      setErrorMessage('');
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
        onChange={event => setState(prevState => ({ ...prevState, title: event.target.value }))}
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
          setState(prevState => ({ ...prevState, imgUrl: event.target.value }));
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
          setState(prevState => ({ ...prevState, imdbUrl: event.target.value }));
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
        onChange={event => setState(prevState => ({ ...prevState, imdbId: event.target.value }))}
      />
      <textarea
        className="MoviesForm__place MoviesForm__place--description"
        placeholder="Add description"
        name="description"
        value={description}
        onChange={event => setState(prevState => ({
          ...prevState, description: event.target.value,
        }))}
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
