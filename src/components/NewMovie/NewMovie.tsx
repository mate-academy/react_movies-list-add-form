import classNames from 'classnames';
import React, { FormEvent, useState } from 'react';

type Props = {
  addMovie: (movie: Movie) => void
};

export const NewMovie: React.FC<Props> = ({ addMovie }) => {
  const [title, setNewTitle] = useState('');
  const [description, setNewDescription] = useState('');
  const [imgUrl, setNewImgUrl] = useState('');
  const [imdbUrl, setNewImdbUrl] = useState('');
  const [imdbId, setNewImdbId] = useState('');
  const [hasTitle, setTitleError] = useState(false);
  const [hasImgUrl, setImgUrlError] = useState(false);
  const [hasImdbUrl, setImdbUrlError] = useState(false);
  const [hasImdbId, setImdbIdError] = useState(false);
  const [hasCorrectImgUrl, setCorrectImgUrlError] = useState(false);
  const [hasCorrectImdbUrl, setCorrectImdbUrlError] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  // eslint-disable-next-line max-len
  const checkUrl = new RegExp(/^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/);

  const newMovie: Movie = {
    title,
    description,
    imgUrl,
    imdbUrl,
    imdbId,
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();

    setTitleError(!title);
    setImgUrlError(!imgUrl);
    setImdbUrlError(!imdbUrl);
    setImdbIdError(!imdbId);

    if (!title || !imdbUrl || !imdbUrl || !imdbId) {
      setButtonDisabled(true);

      return;
    }

    setCorrectImgUrlError(!checkUrl.test(imgUrl));
    setCorrectImdbUrlError(!checkUrl.test(imdbUrl));

    if (!checkUrl.test(imgUrl)) {
      setCorrectImgUrlError(true);

      return;
    }

    if (!checkUrl.test(imdbUrl)) {
      setCorrectImdbUrlError(true);

      return;
    }

    addMovie(newMovie);
    setCorrectImgUrlError(false);
    setCorrectImdbUrlError(false);
    setNewTitle('');
    setNewDescription('');
    setNewImgUrl('');
    setNewImdbUrl('');
    setNewImdbId('');
  };

  const isAddReady = () => {
    const requiredFields = [title, imgUrl, imdbUrl, imdbId];
    const isButtonDisabled = requiredFields.every(field => field.length > 0);

    if (isButtonDisabled) {
      setButtonDisabled(false);
    }
  };

  return (
    <form
      className="form"
      onSubmit={(event) => {
        onSubmit(event);
      }}
      onChange={isAddReady}
    >
      <div className="field">
        <label className="label">
          Title
          <input
            className={classNames(
              'form__title input',
              { 'is-danger': hasImdbId },
            )}
            value={title}
            onChange={event => {
              setNewTitle(event.target.value);
              setTitleError(false);
            }}
            data-cy="form-title"
          />
        </label>
        {
          hasTitle
          && <span className="error">Please enter a title</span>
        }
      </div>

      <div className="field">
        <label className="label">
          Description
          <input
            className="form__description input"
            value={description}
            onChange={event => {
              setNewDescription(event.target.value);
            }}
            data-cy="form-description"
          />
        </label>
      </div>

      <div className="field">
        <label className="label">
          IMG URL
          <input
            className={classNames(
              'form__img-url input',
              { 'is-danger': hasImdbId },
            )}
            value={imgUrl}
            onChange={event => {
              setNewImgUrl(event.target.value);
              setImgUrlError(false);
            }}
            data-cy="form-imgUrl"
          />
        </label>
        {
          hasImgUrl
          && <span className="error">Please enter an IMG URL</span>
        }

        {
          hasCorrectImgUrl
          && <span className="error">Please enter correct IMG URL</span>
        }
      </div>

      <div className="field">
        <label className="label">
          IMBD URL
          <input
            className={classNames(
              'form__imdb-url input',
              { 'is-danger': hasImdbId },
            )}
            value={imdbUrl}
            onChange={event => {
              setNewImdbUrl(event.target.value);
              setImdbUrlError(false);
            }}
            data-cy="form-imdbUrl"
          />
        </label>
        {
          hasImdbUrl
          && <span className="error">Please enter an IMBD URL</span>
        }

        {
          hasCorrectImdbUrl
          && <span className="error">Please enter correct IMBD URL</span>
        }
      </div>

      <div className="field">
        <label className="label">
          IMBD ID
          <input
            className={classNames(
              'form__imdb-id input',
              { 'is-danger': hasImdbId },
            )}
            value={imdbId}
            onChange={event => {
              setNewImdbId(event.target.value);
              setImdbIdError(false);
            }}
            data-cy="form-imdbId"
          />
        </label>
        {
          hasImdbId
          && <span className="error">Please enter an IMBD ID</span>
        }
      </div>

      <button
        className="button"
        type="submit"
        data-cy="form-submit-button"
        disabled={buttonDisabled}
      >
        Add movie
      </button>
    </form>
  );
};
