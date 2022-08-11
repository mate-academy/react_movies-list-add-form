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
  const [hasImgUrlError, setImgUrlError] = useState(false);
  const [hasImdbUrlError, setImdbUrlError] = useState(false);
  const [hasImdbIdError, setImdbIdError] = useState(false);
  const [imgUrlValidationError, setImgUrlValidationError] = useState(false);
  const [ImdbUrlValidationError, setImdbUrlValidationError] = useState(false);

  // eslint-disable-next-line max-len
  const validUrlRegExp = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

  const validUrl = (url: string) => {
    if (url.length > 0) {
      return !validUrlRegExp.test(url);
    }

    return false;
  };

  const blurErrorHandler = (event:React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    switch (name) {
      case 'title':
        if (!value) {
          setTitleError(true);
        }

        break;

      case 'imgUrl':
        if (!value) {
          setImgUrlError(true);
        }

        setImgUrlValidationError(() => validUrl(value));
        break;

      case 'imdbUrl':
        if (!value) {
          setImdbUrlError(true);
        }

        setImdbUrlValidationError(() => validUrl(value));
        break;

      case 'imdbId':
        if (!value) {
          setImdbIdError(true);
        }

        break;

      default:
        break;
    }
  };

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    switch (name) {
      case 'title':
        setTitle(value);
        setTitleError(false);

        break;

      case 'description':
        setDescription(event.target.value);
        break;

      case 'imgUrl':
        setImgUrl(event.target.value);
        setImgUrlError(false);

        break;

      case 'imdbUrl':
        setImdbUrl(event.target.value);
        setImdbUrlError(false);
        break;

      case 'imdbId':
        setImdbId(event.target.value);
        setImdbIdError(false);

        break;

      default:
        break;
    }
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  const fieldsCheck = () => {
    setTitleError(!title);

    setImgUrlError(!imgUrl);

    setImdbUrlError(!imdbUrl);

    setImdbIdError(!imdbId);
  };

  const disableAdd = (
    !title
    || !imgUrl
    || !imdbUrl
    || !imdbId
    || imgUrlValidationError
    || ImdbUrlValidationError
  );

  const submitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    fieldsCheck();

    const movie = {
      title,
      description: description || 'N/A',
      imgUrl,
      imdbUrl,
      imdbId,
    };

    if (disableAdd) {
      return;
    }

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
          name="title"
          type="text"
          data-cy="form-title"
          placeholder="Title"
          onBlur={blurErrorHandler}
          value={title}
          onChange={inputHandler}
        />
        {hasTitleError && (
          <span className="warning">
            Please enter the title
          </span>
        )}
      </div>

      <div className="form__container">
        <input
          className="form__item"
          name="description"
          type="text"
          data-cy="form-description"
          placeholder="Description"
          value={description}
          onChange={inputHandler}
        />
      </div>

      <div className="form__container">
        <input
          className={classNames('form__item', {
            'form__item--warning': hasImgUrlError || imgUrlValidationError,
          })}
          name="imgUrl"
          type="text"
          data-cy="form-imgUrl"
          placeholder="imgUrl"
          value={imgUrl}
          onBlur={blurErrorHandler}
          onChange={inputHandler}
        />
        {hasImgUrlError && (
          <span className="warning">
            Please enter the imgUrl
          </span>
        )}

        {imgUrlValidationError && (
          <span className="warning">
            Please enter correct url
          </span>
        )}
      </div>

      <div className="form__container">
        <input
          className={classNames('form__item', {
            'form__item--warning': hasImdbUrlError || ImdbUrlValidationError,
          })}
          type="text"
          name="imdbUrl"
          data-cy="form-imdbUrl"
          placeholder="imdbUrl"
          value={imdbUrl}
          onBlur={blurErrorHandler}
          onChange={inputHandler}
        />
        {hasImdbUrlError && (
          <span className="warning">
            Please enter the imdbUrl
          </span>
        )}
        {ImdbUrlValidationError && (
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
          name="imdbId"
          type="text"
          data-cy="form-imdbId"
          placeholder="imdbId"
          value={imdbId}
          onBlur={blurErrorHandler}
          onChange={inputHandler}
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
        disabled={disableAdd}
      >
        Add movie
      </button>
    </form>
  );
};
