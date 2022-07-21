import classNames from 'classnames';
import React, { FormEvent, useState } from 'react';

type Props = {
  addMovie: (movie: Movie) => void
};

export const NewMovie: React.FC<Props> = ({ addMovie }) => {
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newImgUrl, setNewImgUrl] = useState('');
  const [newImdbUrl, setNewImdbUrl] = useState('');
  const [newImdbId, setNewImdbId] = useState('');
  const [hasTitle, setTitleError] = useState(false);
  const [hasImgUrl, setImgUrlError] = useState(false);
  const [hasImdbUrl, setImdbUrlError] = useState(false);
  const [hasImdbId, setImdbIdError] = useState(false);
  const [hasCorrectImgUrl, setCorrectImgUrlError] = useState(false);
  const [hasCorrectImdbUrl, setCorrectImdbUrlError] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const requiredFields = [newTitle, newImgUrl, newImdbUrl, newImdbId];
  const isButtonDisabled = requiredFields.every(field => field.length > 0);
  // eslint-disable-next-line max-len
  const checkUrl = new RegExp(/^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/);

  const newMovie: Movie = {
    title: newTitle,
    description: newDescription,
    imgUrl: newImgUrl,
    imdbUrl: newImdbUrl,
    imdbId: newImdbId,
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();

    setTitleError(!newTitle);
    setImgUrlError(!newImgUrl);
    setImdbUrlError(!newImdbUrl);
    setImdbIdError(!newImdbId);

    if (!newTitle || !newImdbUrl || !newImdbUrl || !newImdbId) {
      setButtonDisabled(true);

      return;
    }

    if (!checkUrl.test(newImgUrl) || !checkUrl.test(newImdbUrl)) {
      setCorrectImgUrlError(!checkUrl.test(newImgUrl));
      setCorrectImdbUrlError(!checkUrl.test(newImdbUrl));

      if (checkUrl.test(newImgUrl)) {
        setCorrectImgUrlError(false);
      }

      if (checkUrl.test(newImdbUrl)) {
        setCorrectImdbUrlError(false);
      }

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
            className={classNames('form__title input',
              { 'is-danger': hasImdbId })}
            value={newTitle}
            onChange={event => {
              setNewTitle(event.target.value);
              setTitleError(false);
            }}
            data-cy="form-title"
          />
        </label>
        {hasTitle && <span className="error">Please enter a title</span>}
      </div>

      <div className="field">
        <label className="label">
          Description
          <input
            className="form__description input"
            value={newDescription}
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
            className={classNames('form__img-url input',
              { 'is-danger': hasImdbId })}
            value={newImgUrl}
            onChange={event => {
              setNewImgUrl(event.target.value);
              setImgUrlError(false);
            }}
            data-cy="form-imgUrl"
          />
        </label>
        {hasImgUrl && <span className="error">Please enter an IMG URL</span>}
        {hasCorrectImgUrl
          && <span className="error">Please enter correct IMG URL</span>}
      </div>

      <div className="field">
        <label className="label">
          IMBD URL
          <input
            className={classNames('form__imdb-url input',
              { 'is-danger': hasImdbId })}
            value={newImdbUrl}
            onChange={event => {
              setNewImdbUrl(event.target.value);
              setImdbUrlError(false);
            }}
            data-cy="form-imdbUrl"
          />
        </label>
        {hasImdbUrl && <span className="error">Please enter an IMBD URL</span>}
        {hasCorrectImdbUrl
        && <span className="error">Please enter correct IMBD URL</span>}
      </div>

      <div className="field">
        <label className="label">
          IMBD ID
          <input
            className={classNames('form__imdb-id input',
              { 'is-danger': hasImdbId })}
            value={newImdbId}
            onChange={event => {
              setNewImdbId(event.target.value);
              setImdbIdError(false);
            }}
            data-cy="form-imdbId"
          />
        </label>
        {hasImdbId && <span className="error">Please enter an IMBD ID</span>}
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
