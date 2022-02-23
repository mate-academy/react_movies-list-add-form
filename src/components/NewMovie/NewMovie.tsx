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
  return /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/
    .test(url);
};

function validate(title: string, imgUrl: string, imdbUrl: string, imdbId: string) {
  return {
    title: title.length === 0,
    imgUrl: imgUrl.length === 0 || !isUrl(imgUrl),
    imdbUrl: imdbUrl.length === 0 || !isUrl(imdbUrl),
    imdbId: imdbId.length === 0,
  };
}

export const NewMovie:React.FC<Props> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const [touched, setTouched] = useState({
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
    setTouched({
      title: false, imgUrl: false, imdbUrl: false, imdbId: false,
    });
  };

  const errors = validate(title, imgUrl, imdbUrl, imdbId);

  const isEnabled = !Object.keys(errors).some(x => errors[x as keyof Errors]);

  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
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
  };

  return (
    <form
      className="form"
      onSubmit={onFormSubmit}
    >
      <label
        className={classNames(
          'form__input',
          { 'form__input--error': errors.title && touched.title },
        )}
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
          onBlur={() => setTouched({ ...touched, title: true })}
          className={classNames({ error: errors.title && touched.title })}
        />
      </label>
      <label htmlFor="description" className="form__input">
        Description:
        <input
          type="text"
          id="description"
          placeholder="Description"
          value={description}
          onChange={event => setDescription(event.target.value)}
        />
      </label>
      <label
        className={classNames(
          'form__input',
          { 'form__input--error': errors.imgUrl && touched.imgUrl },
        )}
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
          onBlur={() => setTouched({ ...touched, imgUrl: true })}
          className={classNames({ error: errors.imgUrl && touched.imgUrl })}
        />
      </label>
      <label
        className={classNames(
          'form__input',
          { 'form__input--error': errors.imdbUrl && touched.imdbUrl },
        )}
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
          onBlur={() => setTouched({ ...touched, imdbUrl: true })}
          className={classNames({ error: errors.imdbUrl && touched.imdbUrl })}
        />
      </label>
      <label
        className={classNames(
          'form__input',
          { 'form__input--error': errors.imdbId && touched.imdbId },
        )}
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
          onBlur={() => setTouched({ ...touched, imdbId: true })}
          className={classNames({ error: errors.imdbId && touched.imdbId })}
        />
      </label>
      <button
        type="submit"
        disabled={!isEnabled}
      >
        Add
      </button>
    </form>
  );
};
