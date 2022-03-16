/* eslint-disable jsx-a11y/label-has-associated-control */
import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  onAdd: (movie: Movie) => void
};

interface Movie {
  title: string;
  description: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
}

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const regex = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const [titleEror, setTitleEror] = useState(false);
  const [descriptionEror, setDescriptionEror] = useState(false);
  const [imgUrlEror, setImgUrlEror] = useState(false);
  const [imdbUrlEror, setImdbUrlEror] = useState(false);
  const [imdbIdEror, setImdbIdEror] = useState(false);

  const resetInput = () => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  const resetfalse = () => {
    setTitleEror(false);
    setDescriptionEror(false);
    setImgUrlEror(false);
    setImdbUrlEror(false);
    setImdbIdEror(false);
  };

  const checkedUrl = (url: string) => regex.test(url);

  const isButtonDisabled = () => {
    if (title && imdbId && checkedUrl(imgUrl) && checkedUrl(imdbUrl)) {
      return false;
    }

    return true;
  };

  const onSubmitForm = (event: React.FormEvent) => {
    event.preventDefault();

    onAdd({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });

    resetInput();
    resetfalse();
  };

  return (
    <form
      onSubmit={onSubmitForm}
    >
      <label>
        Title
        <input
          type="text"
          className={classNames('input', { 'input--error': titleEror && !title })}
          placeholder="Plz enter a title"
          value={title}
          onChange={event => setTitle(event.target.value.trim())}
          onBlur={() => {
            if (!title) {
              setTitleEror(true);
            }
          }}
        />
      </label>

      <p
        className={classNames('message', { 'message--error': titleEror && !title })}
      >
        {titleEror && !title && 'required'}
      </p>

      <label>
        Description
        <input
          type="text"
          className={classNames('input', { 'input--error': descriptionEror && !description })}
          placeholder="Plz enter a description"
          value={description}
          onChange={event => setDescription(event.target.value.trim())}
          onBlur={() => {
            if (!description) {
              setDescriptionEror(true);
            }
          }}
        />
      </label>

      <p
        className={classNames('message', { 'message--error': descriptionEror && !description })}
      >
        {descriptionEror && !description && 'required'}
      </p>

      <label>
        Image Url
        <input
          type="text"
          className={classNames('input', { 'input--error': imgUrlEror && !checkedUrl(imgUrl) })}
          placeholder="Plz enter a imgUrl"
          id="imgUrl"
          value={imgUrl}
          onChange={event => setImgUrl(event.target.value.trim())}
          onBlur={() => {
            if (!checkedUrl(imgUrl)) {
              setImgUrlEror(true);
            }
          }}
        />
      </label>

      <p
        className={classNames('message', { 'message--error': imgUrlEror && !checkedUrl(imgUrl) })}
      >
        {imgUrlEror && !checkedUrl(imgUrl) && 'required'}
      </p>

      <label>
        Imdb Url
        <input
          type="text"
          className={classNames('input', { 'input--error': imdbUrlEror && !checkedUrl(imdbUrl) })}
          placeholder="Plz enter a imdbUrl"
          value={imdbUrl}
          id="imdbUrl"
          onChange={event => setImdbUrl(event.target.value.trim())}
          onBlur={() => {
            if (!checkedUrl(imdbUrl)) {
              setImdbUrlEror(true);
            }
          }}
        />
      </label>

      <p
        className={classNames('message', { 'message--error': imdbUrlEror && !checkedUrl(imdbUrl) })}
      >
        {imdbUrlEror && !checkedUrl(imdbUrl) && 'required'}
      </p>

      <label>
        Imdb ID
        <input
          type="text"
          className={classNames('input', { 'input--error': imdbIdEror && !imdbId })}
          placeholder="Plz enter a imdbId"
          value={imdbId}
          onChange={event => setImdbId(event.target.value)}
          onBlur={() => {
            if (!imdbId) {
              setImdbIdEror(true);
            }
          }}
        />
      </label>

      <p
        className={classNames('message', { 'message--error': imdbIdEror && !imdbId })}
      >
        {imdbIdEror && !imdbId && 'required'}
      </p>

      <button
        type="submit"
        className="button"
        disabled={isButtonDisabled()}
      >
        Add
      </button>
    </form>
  );
};
