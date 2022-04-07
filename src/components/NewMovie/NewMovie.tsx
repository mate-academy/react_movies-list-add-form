import React, { useState } from 'react';
import classNames from 'classnames';
import './NewMovie.scss';
import { template } from '../../templates/templates';

type Props = {
  onAdd: (movie: Movie) => void,
};

export const NewMovie: React.FC<Props> = React.memo(({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const resetInputs = () => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  const isCorrectUrl = (url: string) => template.test(url);

  const errors = {
    title: title.trim().length === 0,
    imgUrl: !isCorrectUrl(imgUrl),
    imdbUrl: !isCorrectUrl(imdbUrl),
    imdbId: imdbId.trim().length === 0,
  };

  const [isTitleError, setIsTitleError] = useState(false);
  const [isImgUrlError, setIsImgUrlError] = useState(false);
  const [isImdbUrlError, setIsImdbUrlError] = useState(false);
  const [isImdbIdError, setIsImdbIdError] = useState(false);

  const resetErrors = () => {
    setIsTitleError(false);
    setIsImgUrlError(false);
    setIsImdbUrlError(false);
    setIsImdbIdError(false);
  };

  const resetAll = () => {
    resetErrors();
    resetInputs();
  };

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onAdd({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });

    resetAll();
  };

  return (
    <form
      className="form"
      onSubmit={submitHandler}
    >
      <label htmlFor="title" className="form__label">
        <input
          className={classNames(
            'form__input',
            { 'form__input--error': isTitleError && errors.title },
          )}
          id="title"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          onBlur={() => setIsTitleError(true)}
          required
        />

        <div
          className={classNames(
            'form__error-text',
            { 'form__error-text--hidden': !isTitleError || !errors.title },
          )}
        >
          Please enter a title
        </div>
      </label>

      <label htmlFor="description" className="form__label">
        <textarea
          className="form__input"
          id="description"
          placeholder="Description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </label>

      <label
        htmlFor="imgUrl"
        className="form__label"
      >
        <input
          className={classNames(
            'form__input',
            { 'form__input--error': isImgUrlError && errors.imgUrl },
          )}
          id="imgUrl"
          type="text"
          placeholder="Image URL"
          value={imgUrl}
          onChange={(event) => setImgUrl(event.target.value)}
          onBlur={() => setIsImgUrlError(true)}
          required
        />

        <div
          className={classNames(
            'form__error-text',
            { 'form__error-text--hidden': !isImgUrlError || !errors.imgUrl },
          )}
        >
          Please enter image URL in correct format
        </div>
      </label>

      <label
        className="form__label"
        htmlFor="imdbUrl"
      >
        <input
          className={classNames(
            'form__input',
            { 'form__input--error': isImdbUrlError && errors.imdbUrl },
          )}
          id="imdbUrl"
          type="text"
          placeholder="IMDB URL"
          value={imdbUrl}
          onChange={event => setImdbUrl(event.target.value)}
          onBlur={() => setIsImdbUrlError(true)}
          required
        />

        <div
          className={classNames(
            'form__error-text',
            { 'form__error-text--hidden': !isImdbUrlError || !errors.imdbUrl },
          )}
        >
          Please enter IMDB URL in correct format
        </div>
      </label>

      <label
        className="form__label"
        htmlFor="imdbId"
      >
        <input
          className={classNames(
            'form__input',
            { 'form__input--error': isImdbIdError && errors.imdbId },
          )}
          id="imdbId"
          type="text"
          placeholder="IMDB Id"
          value={imdbId}
          onChange={(event) => setImdbId(event.target.value)}
          onBlur={() => setIsImdbIdError(true)}
          required
        />

        <div
          className={classNames(
            'form__error-text',
            { 'form__error-text--hidden': !isImdbIdError || !errors.imdbId },
          )}
        >
          Please enter IMDB Id
        </div>
      </label>

      <button
        className="form__button"
        type="submit"
      >
        Add
      </button>

      <button
        className="form__button form__button--reset"
        type="button"
        onClick={resetAll}
      >
        Reset
      </button>
    </form>
  );
});
