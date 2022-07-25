import classNames from 'classnames';
import React, { useState } from 'react';
import { Movie } from '../../types/Movie';
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
  const [hasTitle, setTitleError] = useState(true);
  const [hasImgUrl, setImgUrlError] = useState(true);
  const [hasImdbUrl, setImdbUrlError] = useState(true);
  const [hasImdbId, setImdbIdError] = useState(true);

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
      setTitleError(false);
    }

    if (!imgUrl) {
      setImgUrlError(false);
    }

    if (!imdbUrl) {
      setImdbUrlError(false);
    }

    if (!imdbId) {
      setImdbIdError(false);
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
            'input is-danger': !hasTitle,
          })}
          data-cy="form-title"
          placeholder="Enter Title"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />

        {!hasTitle && (
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
            'input is-danger': !hasImgUrl,
          })}
          data-cy="form-imgUrl"
          placeholder="Enter Image's URL"
          value={imgUrl}
          onChange={(event) => {
            setImgUrl(event.target.value);
          }}
        />

        {!hasImgUrl && (
          <p>Image URL is required</p>
        )}
      </div>

      <div className="input-block">
        <input
          type="url"
          name="imdbUrl"
          className={classNames('input is-rounded', {
            'input is-danger': !hasImdbUrl,
          })}
          data-cy="form-imdbUrl"
          placeholder="Enter IMDb URL"
          value={imdbUrl}
          onChange={(event) => {
            setImdbUrl(event.target.value);
          }}
        />

        {!hasImdbUrl && (
          <p>IMDb URL is required</p>
        )}
      </div>

      <div className="input-block">
        <input
          type="text"
          name="imdbId"
          className={classNames('input is-rounded', {
            'input is-danger': !hasImdbId,
          })}
          data-cy="form-imdbId"
          placeholder="Enter Movie's ID"
          value={imdbId}
          onChange={(event) => {
            setImdbId(event.target.value);
          }}
        />

        {!hasImdbId && (
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
