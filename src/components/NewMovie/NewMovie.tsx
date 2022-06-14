import React, { useState } from 'react';
import classnames from 'classnames';
import './NewMovie.scss';

type Props = {
  onAdd: (movie: Movie) => void,
};

enum URLErrors {
  noError = '',
  invalid = 'Wrong URL!',
  empty = 'Please, enter some value',
}

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [description, setDescription] = useState('');

  const [imgUrl, setImgUrl] = useState('');
  const [hasImgUrlError, setHasImgUrlError] = useState(URLErrors.noError);

  const [imdbUrl, setImdbUrl] = useState('');
  const [hasImdbUrlError, setHasImdbUrlError] = useState(URLErrors.noError);

  const [imdbId, setImdbId] = useState('');
  const [hasImdbIdError, setHasImdbIdError] = useState(false);

  // eslint-disable-next-line max-len
  const regex = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

  const changeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const validateTitle = () => {
    const isInvalid = !title;

    setHasTitleError(isInvalid);
  };

  const changeDescription = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  const changeImgUrl = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImgUrl(event.target.value);
  };

  const validateImgUrl = () => {
    if (!imgUrl) {
      setHasImgUrlError(URLErrors.empty);

      return;
    }

    if (!regex.test(imgUrl)) {
      setHasImgUrlError(URLErrors.invalid);

      return;
    }

    setHasImgUrlError(URLErrors.noError);
  };

  const changeImdbUrl = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImdbUrl(event.target.value);
  };

  const validateImdbUrl = () => {
    if (!imdbUrl) {
      setHasImdbUrlError(URLErrors.empty);

      return;
    }

    if (!regex.test(imdbUrl)) {
      setHasImdbUrlError(URLErrors.invalid);

      return;
    }

    setHasImdbUrlError(URLErrors.noError);
  };

  const changeImdbId = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImdbId(event.target.value);
  };

  const validateImdbId = () => {
    const isInvalid = !imdbId;

    setHasImdbIdError(isInvalid);
  };

  const showErrors = () => {
    setHasTitleError(!title);
    setHasImgUrlError(URLErrors.empty);
    setHasImdbUrlError(URLErrors.empty);
    setHasImdbIdError(!imdbId);
  };

  const resetInputs = () => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
    setHasImgUrlError(URLErrors.noError);
    setHasImdbUrlError(URLErrors.noError);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    showErrors();

    if (title && imgUrl && imdbUrl && imdbId) {
      onAdd({
        title, description, imgUrl, imdbUrl, imdbId,
      });
      resetInputs();
    }
  };

  return (
    <>
      <h3>Add movie</h3>
      <form
        onSubmit={handleSubmit}
        className="form"
      >
        <input
          type="text"
          name="title"
          placeholder="Enter the title"
          value={title}
          onBlur={validateTitle}
          onChange={changeTitle}
          className={classnames({
            error: hasTitleError,
            form__field: true,
          })}
        />

        {hasTitleError && (
          <span className="error-text">
            Please, enter the title
          </span>
        )}

        <textarea
          name="description"
          placeholder="Enter the description"
          value={description}
          onChange={changeDescription}
          className="form__field"
        />

        <input
          type="text"
          name="imgUrl"
          placeholder="Image url"
          value={imgUrl}
          onBlur={validateImgUrl}
          onChange={changeImgUrl}
          className={classnames({
            error: hasImgUrlError,
            form__field: true,
          })}
        />

        <span className="error-text">
          {hasImgUrlError}
        </span>

        <input
          type="text"
          name="imdbUrl"
          placeholder="IMDB url"
          value={imdbUrl}
          onBlur={validateImdbUrl}
          onChange={changeImdbUrl}
          className={classnames({
            error: hasImdbUrlError,
            form__field: true,
          })}
        />

        <span className="error-text">
          {hasImdbUrlError}
        </span>

        <input
          type="text"
          name="imdbId"
          placeholder="IMDB id"
          value={imdbId}
          onBlur={validateImdbId}
          onChange={changeImdbId}
          className={classnames({
            error: hasImdbIdError,
            form__field: true,
          })}
        />

        {hasImdbIdError && (
          <span className="error-text">
            Please, enter IMDB id!
          </span>
        )}

        <button
          type="submit"
          className="btn"
        >
          Add
        </button>
      </form>
    </>
  );
};
