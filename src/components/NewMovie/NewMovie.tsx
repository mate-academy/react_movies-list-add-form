import React, { useState } from 'react';
import classNames from 'classnames';

import './NewMovie.scss';

type Props = {
  onAdd: (movie: Movie) => void
};

type Errors = {
  title: boolean,
  imgUrl: boolean,
  imdbUrl: boolean,
  imdbId: boolean
};

const isUrl = (url: string) => {
  // eslint-disable-next-line max-len
  return /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=,\w]+@)[A-Za-z0-9.-]+)((?:\/[~%.\w-_]*)?\??(?:[-=&;%@.\w_]*)#?(?:[\w]*))?)/
    .test(url);
};

function validate(
  title: string,
  imgUrl: string,
  imdbUrl: string,
  imdbId: string,
) {
  return {
    title: !title.length,
    imgUrl: !imgUrl.length || !isUrl(imgUrl),
    imdbUrl: !imdbUrl.length || !isUrl(imdbUrl),
    imdbId: !imdbId.length,
  };
}

export const NewMovie:React.FC<Props> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const [act, reNew] = useState({
    title: false, imgUrl: false, imdbUrl: false, imdbId: false,
  });

  const clearInputs = () => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  const clearErrors = () => {
    reNew({
      title: false, imgUrl: false, imdbUrl: false, imdbId: false,
    });
  };

  const errors = validate(title, imgUrl, imdbUrl, imdbId);

  const isEnabled = !Object.keys(errors).some(x => errors[x as keyof Errors]);

  return (
    <form
      className="form"
      onSubmit={(event) => {
        event.preventDefault();
        const newMovie = {
          title,
          description,
          imgUrl,
          imdbUrl,
          imdbId,
        };

        clearInputs();
        clearErrors();
        onAdd(newMovie);
      }}
    >
      <label
        className={`label ${classNames(
          'form__input',
          { 'form__input--error': errors.title && act.title },
        )}`}
        htmlFor="title"
      >
        Title:
        <input
          type="text"
          id="title"
          placeholder="Title"
          required
          value={title}
          onChange={event => setTitle(event.target.value)}
          onBlur={() => reNew({ ...act, title: true })}
          className={`input ${classNames({ 'is-danger': errors.title && act.title })}`}
        />
      </label>
      <label htmlFor="description" className="label">
        Description:
        <input
          type="text"
          id="description"
          placeholder="Description"
          className="input"
          value={description}
          onChange={event => setDescription(event.target.value)}
        />
      </label>
      <label
        className={`label ${classNames(
          'form__input',
          { 'form__input--error': errors.imgUrl && act.imgUrl },
        )}`}
        htmlFor="imgUrl"
      >
        Image Url:
        <input
          type="text"
          id="imgUrl"
          placeholder="Image Url"
          required
          value={imgUrl}
          onChange={event => setImgUrl(event.target.value)}
          onBlur={() => reNew({ ...act, imgUrl: true })}
          className={`input ${classNames({ 'is-danger': errors.imgUrl && act.imgUrl })}`}
        />
      </label>
      <label
        className={`label ${classNames(
          'form__input',
          { 'form__input--error': errors.imdbUrl && act.imdbUrl },
        )}`}
        htmlFor="imdbUrl"
      >
        IMDB Url:
        <input
          type="text"
          id="imdbUrl"
          placeholder="IMDB Url"
          required
          value={imdbUrl}
          onChange={event => setImdbUrl(event.target.value)}
          onBlur={() => reNew({ ...act, imdbUrl: true })}
          className={`input ${classNames({ 'is-danger': errors.imdbUrl && act.imdbUrl })}`}
        />
      </label>
      <label
        className={`label ${classNames(
          'form__input',
          { 'form__input--error': errors.imdbId && act.imdbId },
        )}`}
        htmlFor="imdbId"
      >
        IMDB Id:
        <input
          type="text"
          id="imdbId"
          placeholder="IMDB Id"
          required
          value={imdbId}
          onChange={event => setImdbId(event.target.value)}
          onBlur={() => reNew({ ...act, imdbId: true })}
          className={`input ${classNames({ 'is-danger': errors.imdbId && act.imdbId })}`}
        />
      </label>
      <button
        type="submit"
        className="button is-primary"
        disabled={!isEnabled}
      >
        Add
      </button>
    </form>
  );
};
