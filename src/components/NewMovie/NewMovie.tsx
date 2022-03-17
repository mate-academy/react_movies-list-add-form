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

const regex = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

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

  const resetInput = () => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  const resetError = () => {
    setTitleError(false);
    setDescriptionError(false);
    setImgUrlError(false);
    setImdbUrlError(false);
    setImdbIdError(false);
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
    resetError();
  };

  return (
    <form
      onSubmit={onSubmitForm}
    >
      <label>
        Title
        <input
          type="text"
          className={classNames(
            'input',
            { 'input--error': titleError && !title },
          )}
          placeholder="Plz enter a title"
          value={title}
          onChange={event => setTitle(event.target.value.trim())}
          onBlur={() => {
            if (!title) {
              setTitleError(true);
            }
          }}
        />
      </label>

      <p
        className={classNames(
          'message',
          { 'message--error': titleError && !title },
        )}
      >
        {titleError && !title && 'required'}
      </p>

      <label>
        Description
        <input
          type="text"
          className={classNames(
            'input',
            { 'input--error': descriptionError && !description },
          )}
          placeholder="Plz enter a description"
          value={description}
          onChange={event => setDescription(event.target.value.trim())}
          onBlur={() => {
            if (!description) {
              setDescriptionError(true);
            }
          }}
        />
      </label>

      <p
        className={classNames(
          'message',
          { 'message--error': descriptionError && !description },
        )}
      >
        {descriptionError && !description && 'required'}
      </p>

      <label>
        Image Url
        <input
          type="text"
          className={classNames(
            'input',
            { 'input--error': imgUrlError && !checkedUrl(imgUrl) },
          )}
          placeholder="Plz enter a imgUrl"
          id="imgUrl"
          value={imgUrl}
          onChange={event => setImgUrl(event.target.value.trim())}
          onBlur={() => {
            if (!checkedUrl(imgUrl)) {
              setImgUrlError(true);
            }
          }}
        />
      </label>

      <p
        className={classNames(
          'message',
          { 'message--error': imgUrlError && !checkedUrl(imgUrl) },
        )}
      >
        {imgUrlError && !checkedUrl(imgUrl) && 'required URL'}
      </p>

      <label>
        Imdb Url
        <input
          type="text"
          className={classNames(
            'input',
            { 'input--error': imdbUrlError && !checkedUrl(imdbUrl) },
          )}
          placeholder="Plz enter a imdbUrl"
          value={imdbUrl}
          id="imdbUrl"
          onChange={event => setImdbUrl(event.target.value.trim())}
          onBlur={() => {
            if (!checkedUrl(imdbUrl)) {
              setImdbUrlError(true);
            }
          }}
        />
      </label>

      <p
        className={classNames(
          'message',
          { 'message--error': imdbUrlError && !checkedUrl(imdbUrl) },
        )}
      >
        {imdbUrlError && !checkedUrl(imdbUrl) && 'required URL'}
      </p>

      <label>
        Imdb ID
        <input
          type="text"
          className={classNames(
            'input',
            { 'input--error': imdbIdError && !imdbId },
          )}
          placeholder="Plz enter a imdbId"
          value={imdbId}
          onChange={event => setImdbId(event.target.value)}
          onBlur={() => {
            if (!imdbId) {
              setImdbIdError(true);
            }
          }}
        />
      </label>

      <p
        className={classNames(
          'message',
          { 'message--error': imdbIdError && !imdbId },
        )}
      >
        {imdbIdError && !imdbId && 'required'}
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
