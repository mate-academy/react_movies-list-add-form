import React, { useState } from 'react';
import classNames from 'classnames';

interface Props {
  onAdd: (movie: Movie) => void,
}

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const [hasTitleError, setTitleError] = useState(false);
  const [hasImgUrlError, setImgUrlError] = useState(false);
  const [hasImdbUrlError, setImdbUrlError] = useState(false);
  const [hasImdbIdError, setImdbIdError] = useState(false);

  const hundleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    event.stopPropagation();

    setTitleError(!title);
    setImgUrlError(!imgUrl);
    setImdbUrlError(!imdbUrl);
    setImdbIdError(!imdbId);

    if (!title || !imgUrl || !imdbUrl || !imdbId) {
      return;
    }

    const newMovie: Movie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    onAdd(newMovie);
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  return (
    <form
      method="post"
      className="form needs-validation"
      onSubmit={(event) => hundleSubmit(event)}
    >
      <div className="input-group mb-3">
        <span className="input-group-text" id="basic-title">Title</span>
        <input
          type="text"
          className={classNames('form-control', {
            'is-invalid': hasTitleError,
            'is-valid': title,
          })}
          data-cy="form-title"
          aria-describedby="basic-title"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
            setTitleError(false);
          }}
        />
      </div>

      <div className="input-group mb-3">
        <span className="input-group-text">Description</span>
        <textarea
          className="form-control"
          aria-label="With textarea"
          data-cy="form-title"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </div>

      <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1">imgUrl</span>
        <input
          type="text"
          className={classNames('form-control', {
            'is-invalid': hasImgUrlError,
            'is-valid': imgUrl,
          })}
          aria-label="Username"
          aria-describedby="basic-addon1"
          data-cy="form-title"
          value={imgUrl}
          onChange={(event) => {
            setImgUrl(event.target.value);
            setImgUrlError(false);
          }}
        />
      </div>

      <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1">imdbUrl</span>
        <input
          type="text"
          className={classNames('form-control', {
            'is-invalid': hasImdbUrlError,
            'is-valid': imdbUrl,
          })}
          aria-label="Username"
          aria-describedby="basic-addon1"
          data-cy="form-title"
          value={imdbUrl}
          onChange={(event) => {
            setImdbUrl(event.target.value);
            setImdbUrlError(false);
          }}
        />
      </div>

      <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1">imdbId</span>
        <input
          type="text"
          className={classNames('form-control', {
            'is-invalid': hasImdbIdError,
            'is-valid': imdbId,
          })}
          aria-label="Username"
          aria-describedby="basic-addon1"
          data-cy="form-title"
          value={imdbId}
          onChange={(event) => {
            setImdbId(event.target.value);
            setImdbIdError(false);
          }}
        />
      </div>

      <button
        type="submit"
        className="btn btn-primary"
      >
        Add
      </button>
    </form>
  );
};
