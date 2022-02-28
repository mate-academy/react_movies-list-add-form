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

  const [beUsed, setBeUsed] = useState({
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
    setBeUsed({
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
          { 'form__input--error': errors.title && beUsed.title },
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
          onBlur={() => setBeUsed({ ...beUsed, title: true })}
          className={classNames({ error: errors.title && beUsed.title })}
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
          { 'form__input--error': errors.imgUrl && beUsed.imgUrl },
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
          onBlur={() => setBeUsed({ ...beUsed, imgUrl: true })}
          className={classNames({ error: errors.imgUrl && beUsed.imgUrl })}
        />
      </label>

      <label
        className={classNames(
          'form__input',
          { 'form__input--error': errors.imdbUrl && beUsed.imdbUrl },
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
          onBlur={() => setBeUsed({ ...beUsed, imdbUrl: true })}
          className={classNames({ error: errors.imdbUrl && beUsed.imdbUrl })}
        />
      </label>

      <label
        className={classNames(
          'form__input',
          { 'form__input--error': errors.imdbId && beUsed.imdbId },
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
          onBlur={() => setBeUsed({ ...beUsed, imdbId: true })}
          className={classNames({ error: errors.imdbId && beUsed.imdbId })}
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
