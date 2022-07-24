import React, { useState } from 'react';
import './NewMovie.scss';

type Props = {
  addMovie: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ addMovie }) => {
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [description, setDescription] = useState('');
  const [descriptionError, setDescriptionError] = useState(false);
  const [imgUrl, setImgUrl] = useState('');
  const [imgUrlError, setImgUrlError] = useState(false);
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbUrlError, setImdbUrlError] = useState(false);
  const [imdbId, setImdbId] = useState('');
  const [imdbIdError, setImdbIdError] = useState(false);

  function submit(event: React.FormEvent) {
    event.preventDefault();
    setTitleError(!title);
    setDescriptionError(!description);
    setImgUrlError(!imgUrl);
    setImdbUrlError(!imdbUrl);
    setImdbIdError(!imdbId);

    if (!title
      || !description
      || !imgUrl
      || !imdbUrl
      || !imdbId) {
      return;
    }

    addMovie({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });

    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  }

  return (
    <form className="NewMovie" onSubmit={submit}>
      <label className="NewMovie__label">
        Title
        <input
          value={title}
          name="title"
          type="text"
          className="NewMovie__input"
          data-cy="form-title"
          onChange={(event) => {
            setTitle(event.target.value);
            setTitleError(false);
          }}
        />
        {titleError && (
          <div className="NewMovie__error">Please enter a title</div>
        )}
      </label>

      <label className="NewMovie__label">
        Description
        <textarea
          value={description}
          name="description"
          className="NewMovie__input NewMovie__descr"
          data-cy="form-description"
          onChange={(event) => {
            setDescription(event.target.value);
            setDescriptionError(false);
          }}
        />
        {descriptionError && (
          <div className="NewMovie__error">Please enter a description</div>
        )}
      </label>

      <label className="NewMovie__label">
        Image Url
        <input
          value={imgUrl}
          name="imgUrl"
          type="text"
          className="NewMovie__input"
          data-cy="form-imgUrl"
          onChange={(event) => {
            setImgUrl(event.target.value);
            setImgUrlError(false);
          }}
        />
        {imgUrlError && (
          <div className="NewMovie__error">
            Please enter a Image Url
          </div>
        )}
      </label>

      <label className="NewMovie__label">
        IMDb Url
        <input
          value={imdbUrl}
          name="imdbUrl"
          type="text"
          className="NewMovie__input"
          data-cy="form-imdbUrl"
          onChange={(event) => {
            setImdbUrl(event.target.value);
            setImdbUrlError(false);
          }}
        />
        {imdbUrlError && (
          <div className="NewMovie__error">
            Please enter a IMDb Url
          </div>
        )}
      </label>

      <label className="NewMovie__label">
        IMDb Id
        <input
          value={imdbId}
          name="imdbId"
          type="text"
          className="NewMovie__input"
          data-cy="form-imdbId"
          onChange={(event) => {
            setImdbId(event.target.value);
            setImdbIdError(false);
          }}
        />
        {imdbIdError && (
          <div className="NewMovie__error">
            Please enter a IMDb Id
          </div>
        )}
      </label>

      <button
        type="submit"
        className="NewMovie__button"
        data-cy="form-submit-button"
      >
        Add movie
      </button>
    </form>
  );
};
