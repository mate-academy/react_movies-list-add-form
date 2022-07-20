import React, { useState } from 'react';
import classNames from 'classnames';
import { Movie } from '../../types/movie';
import './NewMovie.scss';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const defaultMovie: Movie = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };
  const [movie, setMovie] = useState(defaultMovie);
  const [validations, setValidation] = useState({
    title: true,
    imgUrl: true,
    imdbUrl: true,
    imdbId: true,
  });

  const handeInputChange = (
    // eslint-disable-next-line max-len
    event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value, required } = event.target;

    setMovie(prev => ({ ...prev, [name]: value }));

    if (required) {
      setValidation(prev => ({ ...prev, [name]: true }));
    }
  };

  const handleValidation = (
    event: React.FocusEvent<HTMLInputElement, Element>,
  ) => {
    const { value, required, name } = event.target;

    if (!value && required) {
      setValidation(prev => ({ ...prev, [name]: false }));

      return;
    }

    // eslint-disable-next-line max-len
    const urlRegExp = new RegExp(/^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/);

    if ((name === 'imgUrl' || name === 'imdbUrl') && !urlRegExp.test(value)) {
      setValidation(prev => ({ ...prev, [name]: false }));
    }
  };

  const handeFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onAdd(movie);
    setMovie(defaultMovie);
  };

  const isFormValid = Object.values(validations).every(value => value);

  return (
    <form
      className="NewMovie"
      onSubmit={handeFormSubmit}
    >
      <label className="NewMovie__input">
        Title

        <input
          name="title"
          value={movie.title}
          type="text"
          className={classNames(
            'input',
            {
              'is-danger': !validations.title,
            },
          )}
          data-cy="form-title"
          onChange={handeInputChange}
          onBlur={handleValidation}
          required
        />

        { !validations.title && (
          <span className="NewMovie__field-error is-size-7">
            Title is not valid ⚠️
          </span>
        )}
      </label>

      <label className="NewMovie__input">
        Description

        <textarea
          name="description"
          value={movie.description}
          className={classNames('textarea')}
          data-cy="form-description"
          onChange={handeInputChange}
        />
      </label>

      <label className="NewMovie__input">
        Image URL

        <input
          name="imgUrl"
          value={movie.imgUrl}
          type="text"
          className={classNames(
            'input',
            {
              'is-danger': !validations.imgUrl,
            },
          )}
          data-cy="form-imgUrl"
          onChange={handeInputChange}
          onBlur={handleValidation}
          required
        />
        { !validations.imgUrl && (
          <span className="NewMovie__field-error is-size-7">
            Image URL is not valid ⚠️
          </span>
        )}
      </label>

      <label className="NewMovie__input">
        IMDb URL

        <input
          name="imdbUrl"
          value={movie.imdbUrl}
          type="text"
          className={classNames(
            'input',
            {
              'is-danger': !validations.imdbUrl,
            },
          )}
          data-cy="form-imdbUrl"
          onChange={handeInputChange}
          onBlur={handleValidation}
          required
        />

        { !validations.imdbUrl && (
          <span className="NewMovie__field-error is-size-7">
            IMDb URL is not valid ⚠️
          </span>
        )}
      </label>

      <label className="NewMovie__input">
        IMDb ID

        <input
          name="imdbId"
          value={movie.imdbId}
          type="text"
          className={classNames(
            'input',
            {
              'is-danger': !validations.imdbId,
            },
          )}
          data-cy="form-imdbId"
          onChange={handeInputChange}
          onBlur={handleValidation}
          required
        />

        { !validations.imdbId && (
          <span className="NewMovie__field-error is-size-7">
            IMDb ID is not valid ⚠️
          </span>
        )}
      </label>

      <button
        type="submit"
        data-cy="form-submit-button"
        className="button is-success"
        disabled={!isFormValid}
      >
        Add movie
      </button>
    </form>
  );
};
