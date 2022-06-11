import React, { useState } from 'react';
import classNames from 'classnames';

interface Props {
  addMovie: (movie: Movie) => void,
}

export const NewMovie: React.FC<Props> = ({ addMovie }) => {
  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [hasImgUrlError, setHasImgUrlError] = useState(false);
  const [imdbUrl, setImdbUrl] = useState('');
  const [hasImdbUrlError, setHasImdbUrlError] = useState(false);
  const [imdbId, setImdbId] = useState('');
  const [hasImbdIdError, setHasImbdIdError] = useState(false);

  const titleInputFn = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const descriptionInputFn = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const imgUrlInputFn = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImgUrl(event.target.value);
    setHasImgUrlError(false);
  };

  const imdbUrlInputFn = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImdbUrl(event.target.value);
    setHasImdbUrlError(false);
  };

  const imdbIdInputFn = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImdbId(event.target.value);
    setHasImbdIdError(false);
  };

  const submitter = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    setHasTitleError(!title);
    setHasImgUrlError(!imgUrl);
    setHasImdbUrlError(!imdbUrl);
    setHasImbdIdError(!imdbId);

    if (title && imgUrl && imdbUrl && imdbId) {
      const newMovie: Movie = {
        title,
        description,
        imgUrl,
        imdbUrl,
        imdbId,
      };

      addMovie(newMovie);

      setTitle('');
      setDescription('');
      setImgUrl('');
      setImdbUrl('');
      setImdbId('');
    }
  };

  return (
    <form
      className="form"
      onSubmit={submitter}
    >
      <h1 className="title is-3">Add new film:</h1>

      <div className="field">
        <label className="label" htmlFor="title">Title:</label>
        <div className="control">
          <input
            className={classNames('input', { 'is-danger': hasTitleError })}
            type="text"
            id="title"
            placeholder="e.g. &apos;Terminator-2&apos;"
            value={title}
            onChange={titleInputFn}
          />
        </div>
        {hasTitleError && (
          <p className="help is-danger">Please enter the title!</p>
        )}
      </div>

      <div className="field">
        <label className="label" htmlFor="description">Description:</label>
        <div className="control">
          <input
            className="input"
            id="description"
            type="text"
            placeholder="e.g. &apos;Everybody will die in the end&apos;"
            value={description}
            onChange={descriptionInputFn}
          />
        </div>
      </div>

      <div className="field">
        <label className="label" htmlFor="imgUrl">ImgUrl:</label>
        <div className="control">
          <input
            className={classNames('input', { 'is-danger': hasImgUrlError })}
            id="imgUrl"
            type="url"
            placeholder="Put the imgUrl here"
            value={imgUrl}
            onChange={imgUrlInputFn}
          />
        </div>
        {hasImgUrlError && (
          <p className="help is-danger">Please insert the imgUrl!</p>
        )}
      </div>

      <div className="field">
        <label className="label" htmlFor="imdbUrl">imdbUrl:</label>
        <div className="control">
          <input
            className={classNames('input', { 'is-danger': hasImdbUrlError })}
            id="imdbUrl"
            type="url"
            placeholder="Insert the imdbUrl link"
            value={imdbUrl}
            onChange={imdbUrlInputFn}
          />
        </div>
        {hasImdbUrlError && (
          <p className="help is-danger">Please insert the imdbUrl!</p>
        )}
      </div>

      <div className="field">
        <label className="label" htmlFor="imdbId">imdbId:</label>
        <div className="control">
          <input
            className={classNames('input', { 'is-danger': hasImbdIdError })}
            id="imdbId"
            type="text"
            placeholder="Enter the imdbId"
            value={imdbId}
            onChange={imdbIdInputFn}
          />
        </div>
        {hasImbdIdError && (
          <p className="help is-danger">Please write the imdbId!</p>
        )}
      </div>

      <button
        className="button is-info"
        type="submit"
      >
        Add
      </button>
    </form>
  );
};
