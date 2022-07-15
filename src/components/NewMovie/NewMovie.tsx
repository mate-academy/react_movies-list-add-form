/* eslint-disable no-useless-escape */
/* eslint-disable max-len */
import React, { useState } from 'react';
import classname from 'classnames';
import './NewMovie.scss';

interface Prop {
  addMovie: (
    title: string,
    description: string,
    imgUrl: string,
    imdbUrl: string,
    imdbId: string,) => void;
}

export const NewMovie:React.FC<Prop> = ({ addMovie }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');
  const [imdbUrlEror, setimdbUrlEror] = useState(false);
  const [imgUrlEror, setImgUrlEror] = useState(false);

  const regExp = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

  const clearInput = () => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  const handleSubmit = (event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (regExp.test(imdbUrl) && regExp.test(imgUrl)) {
      addMovie(title, description, imgUrl, imdbUrl, imdbId);
      clearInput();
      setimdbUrlEror(false);
      setImgUrlEror(false);
    } else if (regExp.test(imdbUrl) && !regExp.test(imgUrl)) {
      setimdbUrlEror(false);
      setImgUrlEror(true);
    } else if (!regExp.test(imdbUrl) && regExp.test(imgUrl)) {
      setimdbUrlEror(true);
      setImgUrlEror(false);
    } else {
      setimdbUrlEror(true);
      setImgUrlEror(true);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
    >
      <h2 className="titleName">Add new movie</h2>

      <label htmlFor="title">Title</label>
      <input
        type="text"
        name="title"
        className={classname('input', { 'is-primary': title, 'is-danger': !title })}
        required
        placeholder="Title"
        value={title}
        onChange={(event) => (
          setTitle(event.target.value)
        )}
      />
      <label htmlFor="description">Description</label>
      <input
        type="text"
        name="description"
        className={classname('input', { 'is-primary': description, 'is-danger': !description })}
        required
        placeholder="Description"
        value={description}
        onChange={(event) => (
          setDescription(event.target.value)
        )}
      />
      <label htmlFor="imgUrl">{!imgUrlEror ? 'ImgUrl' : 'Wrong ImgUrl !!!!!!!!!!' }</label>
      <input
        type="text"
        name="imgUrl"
        className={classname('input', { 'is-primary': imgUrl || !imgUrlEror, 'is-danger': !imgUrl || imgUrlEror })}
        required
        placeholder="ImgUrl"
        value={imgUrl}
        onChange={(event) => (
          setImgUrl(event.target.value)
        )}
      />
      <label htmlFor="imdbUrl">{!imdbUrlEror ? 'ImdbUrl' : 'Wrong ImdbUrl !!!!!!!!' }</label>
      <input
        type="text"
        name="imdbUrl"
        className={classname('input', { 'is-primary': imdbUrl || !imdbUrlEror, 'is-danger': !imdbUrl || imdbUrlEror })}
        required
        placeholder="ImdbUrl"
        value={imdbUrl}
        onChange={(event) => (
          setImdbUrl(event.target.value)
        )}
      />
      <label htmlFor="imdbId">ImdbId</label>
      <input
        type="text"
        name="imdbId"
        className={classname('input', { 'is-primary': imdbId, 'is-danger': !imdbId })}
        required
        placeholder="ImdbId"
        value={imdbId}
        onChange={(event) => (
          setImdbId(event.target.value)
        )}
      />
      {imdbUrlEror}
      <button
        type="submit"
        className="button is-primary"
        disabled={!title || !description || !imgUrl || !imdbId || !imdbUrl}
      >
        Add movie
      </button>
    </form>
  );
};
