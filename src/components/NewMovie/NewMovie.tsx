import classNames from 'classnames';
import React, { useState } from 'react';
import { Movie } from '../../react-app-env';
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
  const [hasTitleError, setTitleError] = useState(false);
  const [hasImgUrlError, setImgUrlError] = useState(false);
  const [hasImdbUrlError, setImdbUrlError] = useState(false);
  const [hasImdbIdError, setImdbIdError] = useState(false);

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title) {
      setTitleError(true);
    }

    if (!imgUrl) {
      setImgUrlError(true);
    }

    if (!imdbUrl) {
      setImdbUrlError(true);
    }

    if (!imdbId) {
      setImdbIdError(true);
    }

    const movie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    if (title && imgUrl && imdbUrl && imdbId) {
      addMovie(movie);
      resetForm();
    }
  };

  const handleBlurTitle = () => {
    if (!title) {
      setTitleError(true);
    } else {
      setTitleError(false);
    }
  };

  const handleBlurImgUrl = () => {
    if (!imgUrl) {
      setImgUrlError(true);
    } else {
      setImgUrlError(false);
    }
  };

  const handleBlurImdbUrl = () => {
    if (!imdbUrl) {
      setImdbUrlError(true);
    } else {
      setImdbUrlError(false);
    }
  };

  const handleBlurImdbId = () => {
    if (!imdbId) {
      setImdbIdError(true);
    } else {
      setImdbIdError(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="form"
    >
      <div className="input-block">
        <input
          type="text"
          name="title"
          className={classNames('input is-rounded', {
            'input is-danger': hasTitleError,
          })}
          data-cy="form-title"
          placeholder="Enter Title"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
          onBlur={handleBlurTitle}
        />

        {hasTitleError && (
          <p>Title is required</p>
        )}
      </div>

      <div className="input-block">
        <input
          type="text"
          name="description"
          className="input is-rounded description"
          data-cy="form-description"
          placeholder="Enter Description"
          value={description}
          onChange={(event) => {
            setDescription(event.target.value);
          }}
        />
      </div>

      <div className="input-block">
        <input
          type="url"
          name="imgUrl"
          className={classNames('input is-rounded', {
            'is-danger': hasImgUrlError,
          })}
          data-cy="form-imgUrl"
          placeholder="Enter Image's URL"
          value={imgUrl}
          onChange={(event) => {
            setImgUrl(event.target.value);
          }}
          onBlur={handleBlurImgUrl}
        />

        {hasImgUrlError && (
          <p>Image URL is required</p>
        )}
      </div>

      <div className="input-block">
        <input
          type="url"
          name="imdbUrl"
          className={classNames('input is-rounded', {
            'is-danger': hasImdbUrlError,
          })}
          data-cy="form-imdbUrl"
          placeholder="Enter IMDb URL"
          value={imdbUrl}
          onChange={(event) => {
            setImdbUrl(event.target.value);
          }}
          onBlur={handleBlurImdbUrl}
        />

        {hasImdbUrlError && (
          <p>IMDb URL is required</p>
        )}
      </div>

      <div className="input-block">
        <input
          type="text"
          name="imdbId"
          className={classNames('input is-rounded', {
            'is-danger': hasImdbIdError,
          })}
          data-cy="form-imdbId"
          placeholder="Enter Movie's ID"
          value={imdbId}
          onChange={(event) => {
            setImdbId(event.target.value);
          }}
          onBlur={handleBlurImdbId}
        />

        {hasImdbIdError && (
          <p>IMDb ID is required</p>
        )}
      </div>

      <button
        type="submit"
        className="button is-success"
      >
        Submit
      </button>
    </form>
  );
};
