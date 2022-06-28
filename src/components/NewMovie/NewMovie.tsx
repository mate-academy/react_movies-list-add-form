import React, { FC, useState } from 'react';
import classNames from 'classnames';

export interface NewMovieProps {
  onAdd: (movie: Movie) => void,
}
export const NewMovie: FC<NewMovieProps> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [isTitleInvalid, setIsTitleInvalid] = useState(false);
  const [titleErrorMessage, setTitleErrorMessage] = useState('');

  const [description, setDescription] = useState('');

  const [imgUrl, setImgUrl] = useState('');
  const [isImgUrlInvalid, setIsImgUrlInvalid] = useState(false);
  const [imgUrlErrorMessage, setImgUrlErrorMessage] = useState('');

  const [imdbUrl, setImdbUrl] = useState('');
  const [isImdbUrlInvalid, setIsImdbUrlInvalid] = useState(false);
  const [imdbUrlErrorMessage, setImdbUrlErrorMessage] = useState('');

  const [imdbId, setImdbId] = useState('');
  const [isImdbIdInvalid, setIsImdbIdInvalid] = useState(false);
  const [imdbIdErrorMessage, setImdbIdErrorMessage] = useState('');

  const invalidUrlChars = /[^a-zA-Z0-9-._~:/?#[@!$&'()*+,;=]/g;

  const newMovie = {
    title,
    description,
    imgUrl,
    imdbUrl,
    imdbId,
  };

  const clearForm = () => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  const validateForm = () => {
    if (!title) {
      setIsTitleInvalid(true);
      setTitleErrorMessage('Title is required');
    }

    if (!imdbId) {
      setIsImdbIdInvalid(true);
      setImdbIdErrorMessage('ImdbId is required');
    }

    if (!imgUrl) {
      setIsImgUrlInvalid(true);
      setImgUrlErrorMessage('ImgUrl is required');
    }

    if (!imdbUrl) {
      setIsImdbUrlInvalid(true);
      setImdbUrlErrorMessage('ImdbUrl is required');
    }
  };


  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (title && imdbId && imgUrl && imdbUrl) {
      onAdd(newMovie);
      clearForm();
    }
  };

  return (
    <form
      onSubmit={(event) => {
        validateForm();
        submitForm(event);
      }}
    >
      <div className="form">
        <div className="control form__control">
          <input
            value={title}
            className={classNames('input', { input__error: isTitleInvalid })}
            type="text"
            placeholder="Enter movie Title"
            data-cy="form-title"
            onChange={(event) => {
              setTitle(event.target.value);
              setIsTitleInvalid(false);
              setTitleErrorMessage('');
            }}
            onFocus={() => setIsTitleInvalid(true)}
          />
          <p className="input__error-message">{titleErrorMessage}</p>
        </div>

        <div className="
          control
          form__control
        "
        >
          <textarea
            value={description}
            className="
              input
              form__control--description"
            placeholder="Enter movie Description"
            data-cy="form-description"
            onChange={(event) => {
              setDescription(event.target.value);
            }}
          />
        </div>

        <div className="control form__control">
          <input
            value={imgUrl}
            className={classNames('input', { input__error: isImgUrlInvalid })}
            placeholder="Enter movie imgUrl"
            data-cy="form-imgUrl"
            onChange={(event) => {
              setImgUrl(event.target.value
                .replace(invalidUrlChars, ''));
              setIsImgUrlInvalid(false);
              setImgUrlErrorMessage('');
            }}
            onFocus={() => setIsImgUrlInvalid(true)}
          />
          <p className="input__error-message">{imgUrlErrorMessage}</p>
        </div>

        <div className="control form__control">
          <input
            value={imdbUrl}
            className={classNames('input', { input__error: isImdbUrlInvalid })}
            placeholder="Enter movie imdbUrl"
            data-cy="form-imdbUrl"
            onChange={(event) => {
              setImdbUrl(event.target.value
                .replace(invalidUrlChars, ''));
              setIsImdbUrlInvalid(false);
              setImdbUrlErrorMessage('');
            }}
            onFocus={() => setIsImdbUrlInvalid(true)}
          />
          <p className="input__error-message">{imdbUrlErrorMessage}</p>
        </div>

        <div className="control form__control">
          <input
            value={imdbId}
            className={classNames('input', { input__error: isImdbIdInvalid })}
            placeholder="Enter movie imdbId"
            data-cy="form-imdbId"
            onChange={(event) => {
              setImdbId(event.target.value);
              setIsImdbIdInvalid(false);
              setImdbIdErrorMessage('');
            }}
            onFocus={() => setIsImdbIdInvalid(true)}
          />
          <p className="input__error-message">{imdbIdErrorMessage}</p>
        </div>

        <div className="field is-grouped">
          <div className="control form__control">
            <button
              type="submit"
              className="button is-link"
              data-cy="form-submit-button"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};
