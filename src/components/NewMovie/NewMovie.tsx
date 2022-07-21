import classNames from 'classnames';
import React, { FormEvent, useState } from 'react';
import './NewMovie.scss';

type Props = {
  addMovie: (movie: Movie) => void,
};

export const NewMovie: React.FC<Props> = ({ addMovie }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const [hasTitleError, setTitleError] = useState(false);
  const [hasDescriptionError, setDescriptionError] = useState(false);
  const [hasImgUrlError, setImgUrlError] = useState(false);
  const [hasImdbUrlError, setImdbUrlError] = useState(false);
  const [hasImdbIdError, setImdbIdError] = useState(false);
  const [hasValidImgUrl, setValidImgUrl] = useState(true);
  const [hasValidImdbUrl, setValidImdbUrl] = useState(true);

  // eslint-disable-next-line max-len
  const validUrlRegExp = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

  const validImgUrl = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (imgUrl && !validUrlRegExp.test(event.target.value)) {
      setValidImgUrl(false);
    } else {
      setValidImgUrl(true);
    }
  };

  const validImdbUrl = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (imdbUrl && !validUrlRegExp.test(event.target.value)) {
      setValidImdbUrl(false);
    } else {
      setValidImdbUrl(true);
    }
  };

  const titleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleError(false);
  };

  const descriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
    setDescriptionError(false);
  };

  const imgUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImgUrl(event.target.value);
    setImgUrlError(false);
  };

  const imdbUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImdbUrl(event.target.value);
    setImdbUrlError(false);
  };

  const imdbIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImdbId(event.target.value);
    setImdbIdError(false);
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  const submitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setTitleError(!title);

    setDescriptionError(!description);

    setImgUrlError(!imgUrl);

    setImdbUrlError(!imdbUrl);

    setImdbIdError(!imdbId);

    const noErrors = [
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    ];

    if (!noErrors.every(item => item.length > 0)
        || (!validUrlRegExp.test(imgUrl) && !validUrlRegExp.test(imdbUrl))) {
      return;
    }

    const movie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    addMovie(movie);

    resetForm();
  };

  return (
    <form
      className="NewMovie"
      onSubmit={submitForm}
    >
      <div className="form__container">
        <input
          className={classNames('form__item', {
            'form__item--warning': hasTitleError,
          })}
          type="text"
          data-cy="form-title"
          placeholder="Title"
          value={title}
          onChange={event => {
            titleChange(event);
          }}
        />
        {hasTitleError && (
          <span className="warning">
            Please enter the title
          </span>
        )}
      </div>

      <div className="form__container">
        <input
          className={classNames('form__item', {
            'form__item--warning': hasDescriptionError,
          })}
          type="text"
          data-cy="form-description"
          placeholder="Description"
          value={description}
          onChange={event => {
            descriptionChange(event);
          }}
        />
        {hasDescriptionError && (
          <span className="warning">
            Please enter the description
          </span>
        )}
      </div>

      <div className="form__container">
        <input
          className={classNames('form__item', {
            'form__item--warning': hasImgUrlError || !hasValidImgUrl,
          })}
          type="text"
          data-cy="form-imgUrl"
          placeholder="imgUrl"
          value={imgUrl}
          onChange={event => {
            imgUrlChange(event); validImgUrl(event);
          }}
        />
        {hasImgUrlError && (
          <span className="warning">
            Please enter the imgUrl
          </span>
        )}

        {!hasValidImgUrl && (
          <span className="warning">
            Please enter correct url
          </span>
        )}
      </div>

      <div className="form__container">
        <input
          className={classNames('form__item', {
            'form__item--warning': hasImdbUrlError || !hasValidImdbUrl,
          })}
          type="text"
          data-cy="form-imdbUrl"
          placeholder="imdbUrl"
          value={imdbUrl}
          onChange={event => {
            imdbUrlChange(event); validImdbUrl(event);
          }}
        />
        {hasImdbUrlError && (
          <span className="warning">
            Please enter the imdbUrl
          </span>
        )}
        {!hasValidImdbUrl && (
          <span className="warning">
            Please enter correct url
          </span>
        )}
      </div>

      <div className="form__container">
        <input
          className={classNames('form__item', {
            'form__item--warning': hasImdbIdError,
          })}
          type="text"
          data-cy="form-imdbId"
          placeholder="imdbId"
          value={imdbId}
          onChange={event => {
            imdbIdChange(event);
          }}
        />
        {hasImdbIdError && (
          <span className="warning">
            Please enter the imdbId
          </span>
        )}
      </div>

      <button
        className="form__button"
        type="submit"
      >
        Add movie
      </button>
    </form>
  );
};
