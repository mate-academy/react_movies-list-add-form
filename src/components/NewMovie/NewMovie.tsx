import classNames from 'classnames';
import React, { useState } from 'react';
import './NewMovie.scss';

type Props = {
  onAdd: (movie: Movie) => void,
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newImgUrl, setNewImgUrl] = useState('');
  const [newImdbUrl, setNewImdbUrl] = useState('');
  const [newImdbId, setNewImdbId] = useState('');
  const [hasTitleError, setTitleError] = useState(false);
  const [hasImgUrlError, setImgUrlError] = useState(false);
  const [hasImdbUrlError, setImdbUrlError] = useState(false);
  const [hasImdbIdError, setImdbIdError] = useState(false);
  const [hasValidImgUrl, setValidImgUrl] = useState(true);
  const [hasValidImdbUrl, setValidImdbUrl] = useState(true);
  const requiredFields = !newTitle || !newImgUrl || !newImdbUrl
    || !newImdbId || !hasValidImgUrl || !hasValidImdbUrl;
  const clearFields = () => {
    setNewTitle('');
    setNewDescription('');
    setNewImgUrl('');
    setNewImdbUrl('');
    setNewImdbId('');
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (requiredFields) {
      return;
    }

    const currentMovie = {
      title: newTitle,
      description: newDescription,
      imgUrl: newImgUrl,
      imdbUrl: newImdbUrl,
      imdbId: newImdbId,
    };

    onAdd(currentMovie);
    clearFields();
  };

  // eslint-disable-next-line max-len
  const regex = new RegExp(/^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/);

  return (
    <form
      className="newMovie"
      onSubmit={onSubmit}
    >
      <input
        className={
          classNames(
            'input is-primary',
            { 'is-danger': hasTitleError },
          )
        }
        data-cy="form-title"
        type="text"
        name="title"
        placeholder="Title"
        value={newTitle}
        onBlur={(event) => {
          setTitleError(!event.target.value);
        }}
        onChange={(event) => {
          setNewTitle(event.target.value);
          setTitleError(false);
        }}
      />

      <div className="is-error">
        {hasTitleError && 'Please, enter a title'}
      </div>

      <input
        className="input is-primary non-required"
        data-cy="form-description"
        type="text"
        name="description"
        placeholder="Description"
        value={newDescription}
        onChange={(event) => {
          setNewDescription(event.target.value);
        }}
      />

      <input
        className={
          classNames(
            'input is-link',
            { 'is-danger': hasImgUrlError },
            { 'is-danger': !hasValidImgUrl },
          )
        }
        data-cy="form-imgUrl"
        type="text"
        name="imgUrl"
        placeholder="imgUrl"
        value={newImgUrl}
        onBlur={(event) => {
          setImgUrlError(!event.target.value);
        }}
        onChange={(event) => {
          setNewImgUrl(event.target.value);
          setValidImgUrl(regex.test(event.target.value));
          setImgUrlError(false);
        }}
      />

      <div className="is-error">
        {!hasValidImgUrl && <div>Invalid Url</div>}
        {hasImgUrlError && <div>Please, enter a imgUrl</div>}
      </div>

      <input
        className={
          classNames(
            'input is-link',
            { 'is-danger': hasImdbUrlError },
            { 'is-danger': !hasValidImdbUrl },
          )
        }
        data-cy="form-imdbUrl"
        type="text"
        name="imdbUrl"
        placeholder="imdbUrl"
        value={newImdbUrl}
        onBlur={(event) => {
          setImdbUrlError(!event.target.value);
        }}
        onChange={(event) => {
          setNewImdbUrl(event.target.value);
          setValidImdbUrl(regex.test(event.target.value));
          setImdbUrlError(false);
        }}
      />

      <div className="is-error">
        {!hasValidImdbUrl && <div>Invalid Url</div>}
        {hasImdbUrlError && <div>Please, enter a imdbUrl</div>}
      </div>

      <input
        className={
          classNames(
            'input is-primary',
            { 'is-danger': hasImdbIdError },
          )
        }
        data-cy="form-imdbId"
        type="text"
        name="imdbId"
        placeholder="imdbId"
        value={newImdbId}
        onBlur={(event) => {
          setImdbIdError(!event.target.value);
        }}
        onChange={(event) => {
          setNewImdbId(event.target.value);
          setImdbIdError(false);
        }}
      />

      <div className="is-error">
        {hasImdbIdError && 'Please, enter a imdbId'}
      </div>

      <button
        className="button is-primary"
        data-cy="form-submit-button"
        type="submit"
        disabled={requiredFields}
      >
        Add
      </button>
    </form>
  );
};
