import React, { FormEvent, useState } from 'react';
import classNames from 'classnames';
import { Movie } from '../../react-app-env';

import './NewMovie.scss';

type Props = {
  addFunction: (movie: Movie) => void,
};

export const NewMovie: React.FC<Props> = React.memo(({ addFunction }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');
  const [titleRequiredError, setTitleRequiredError] = useState(false);
  const [imgUrlRequiredError, setImgUrlRequiredError] = useState(false);
  const [imdbUrlRequiredError, setImdbUrlRequiredError] = useState(false);
  const [imdbIdRequiredError, setImdbIdRequiredError] = useState(false);

  const isFieldsFilled = title.length > 0 && imgUrl.length > 0
    && imdbUrl.length > 0 && imdbId.length > 0;
  const isNoError = !titleRequiredError && !imgUrlRequiredError
  && !imdbUrlRequiredError && !imdbIdRequiredError;

  // eslint-disable-next-line max-len
  const regExp = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

  const onTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const onDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const onImgUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImgUrl(event.target.value);
  };

  const onImdbUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImdbUrl(event.target.value);
  };

  const onImdbIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImdbId(event.target.value);
  };

  const onTitleRequiredError = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.value) {
      setTitleRequiredError(true);
    } else {
      setTitleRequiredError(false);
    }
  };

  const onImgUrlRequiredError = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (!event.target.value || !regExp.test(imgUrl)) {
      setImgUrlRequiredError(true);
      setImgUrlRequiredError(true);
    } else {
      setImgUrlRequiredError(true);
      setImgUrlRequiredError(false);
    }
  };

  const onImdbUrlRequiredError = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (!event.target.value || !regExp.test(imdbUrl)) {
      setImdbUrlRequiredError(true);
      setImdbUrlRequiredError(true);
    } else {
      setImdbUrlRequiredError(false);
      setImdbUrlRequiredError(false);
    }
  };

  const onImdbIdRequiredError = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (!event.target.value) {
      setImdbIdRequiredError(true);
    } else {
      setImdbIdRequiredError(false);
    }
  };

  const submitFunction = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const movie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    addFunction(movie);

    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  return (
    <form className="NewMovie" onSubmit={submitFunction}>
      <label htmlFor="title">
        <input
          data-cy="form-title"
          type="text"
          id="title"
          placeholder="Title"
          value={title}
          onChange={onTitleChange}
          onBlur={onTitleRequiredError}
          required
          className={classNames(
            'input-field',
            {
              'error-field': titleRequiredError,
            },
          )}
        />
      </label>

      {titleRequiredError && (
        <span className="error-msg">This field is required</span>
      )}

      <label htmlFor="description">
        <input
          data-cy="form-description"
          type="text"
          id="description"
          placeholder="Description"
          value={description}
          onChange={onDescriptionChange}
          className="input-field"
        />
      </label>

      <label htmlFor="imgUrl">
        <input
          data-cy="form-imgUrl"
          type="text"
          id="imgUrl"
          placeholder="Image Url"
          value={imgUrl}
          onChange={onImgUrlChange}
          onBlur={onImgUrlRequiredError}
          required
          className={classNames(
            'input-field',
            {
              'error-field': imgUrlRequiredError,
            },
          )}
        />
      </label>

      {imgUrlRequiredError && (
        <span className="error-msg">This field is required</span>
      )}

      <label htmlFor="imdbUrl">
        <input
          data-cy="form-imdbUrl"
          type="text"
          id="imdbUrl"
          placeholder="IMDb Url"
          value={imdbUrl}
          onChange={onImdbUrlChange}
          onBlur={onImdbUrlRequiredError}
          required
          className={classNames(
            'input-field',
            {
              'error-field': imdbUrlRequiredError,
            },
          )}
        />
      </label>

      {imdbUrlRequiredError && (
        <span className="error-msg">This field is required</span>
      )}

      <label htmlFor="imdbId">
        <input
          data-cy="form-imdbId"
          type="text"
          id="imdbId"
          placeholder="IMDb Id"
          value={imdbId}
          onChange={onImdbIdChange}
          onBlur={onImdbIdRequiredError}
          required
          className={classNames(
            'input-field',
            {
              'error-field': imdbIdRequiredError,
            },
          )}
        />
      </label>

      {imdbIdRequiredError && (
        <span className="error-msg">This field is required</span>
      )}

      <button
        disabled={!isFieldsFilled || !isNoError}
        type="submit"
        className="btn btn-success"
      >
        Add
      </button>
    </form>
  );
});
