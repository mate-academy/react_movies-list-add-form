import React, { useState } from 'react';
import classNames from 'classnames';
import './NewMovie.scss';

type Props = {
  addMovie: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ addMovie }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');
  const [isValidTitle, titleValidation] = useState(true);
  const [isValidimgUrl, imgUrlValidation] = useState(true);
  const [isValidimdbUrl, imdbUrlValidation] = useState(true);
  const [isValidimdbId, imdbIdValidation] = useState(true);

  const clearFrom = () => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  // eslint-disable-next-line max-len
  const urlRegExp = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const movie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    if (title && imgUrl && imdbUrl && imdbId) {
      addMovie(movie);
      clearFrom();
    }

    if (!title) {
      titleValidation(false);
    }

    if (!imgUrl) {
      imgUrlValidation(false);
    }

    if (!imdbUrl) {
      imdbUrlValidation(false);
    }

    if (!imdbId) {
      imdbIdValidation(false);
    }
  };

  const blureHandler = (event: React.FocusEvent<HTMLInputElement, Element>) => {
    const { name, value } = event.target;

    switch (name) {
      case 'title':
        if (!title) {
          titleValidation(false);
        }

        break;

      case 'imgUrl':
        if (!imgUrl || !urlRegExp.test(value)) {
          imgUrlValidation(false);
        }

        break;

      case 'imdbUrl':
        if (!imdbUrl || !urlRegExp.test(value)) {
          imdbUrlValidation(false);
        }

        break;

      case 'imdbId':
        if (!imdbId) {
          imdbIdValidation(false);
        }

        break;

      default:
        break;
    }
  };

  const disabledButton = (!titleValidation || !imgUrlValidation
    || !imdbUrlValidation || !imdbIdValidation);

  return (
    <form
      onSubmit={handleSubmit}
      className="form"
    >
      <input
        type="text"
        name="title"
        className={classNames('input is-success', {
          'input is-danger': !isValidTitle,
        })}
        data-cy="form-title"
        placeholder="Add a title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        onBlur={blureHandler}
      />

      {!isValidTitle && <p>Please, enter the title</p>}

      <input
        type="text"
        name="description"
        className="input is-success description"
        data-cy="form-description"
        placeholder="Add a description"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />

      <input
        type="url"
        name="imgUrl"
        className={classNames('input is-success', {
          'input is-danger': !isValidimgUrl,
        })}
        data-cy="form-imgUrl"
        placeholder="Add an image's url"
        value={imgUrl}
        onChange={(event) => setImgUrl(event.target.value)}
        onBlur={blureHandler}
      />

      {!isValidimgUrl && <p>Please, enter the url of image</p>}

      <input
        type="url"
        name="imdbUrl"
        className={classNames('input is-success', {
          'input is-danger': !isValidimdbUrl,
        })}
        data-cy="form-imdbUrl"
        placeholder="Add an IMDB url"
        value={imdbUrl}
        onChange={(event) => setImdbUrl(event.target.value)}
        onBlur={blureHandler}
      />

      {!isValidimdbUrl && <p>Please, enter the url of movie</p>}

      <input
        type="text"
        name="imdbId"
        className={classNames('input is-success', {
          'input is-danger': !isValidimdbId,
        })}
        data-cy="form-imdbId"
        placeholder="Add a movie's id"
        value={imdbId}
        onChange={(event) => setImdbId(event.target.value)}
        onBlur={blureHandler}
      />

      {!isValidimdbId && <p>Please, enter the id</p>}

      <button
        type="submit"
        className="button is-primary"
        disabled={disabledButton}
      >
        Submit
      </button>
    </form>
  );
};
