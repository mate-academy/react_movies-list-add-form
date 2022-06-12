import React, { useState } from 'react';
import './NewMovie.scss';
import classNames from 'classnames';
import { AddMovie } from '../../react-app-env';

type Props = {
  onAdd: AddMovie,
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [titleHasError, setTitleHasError] = useState(false);

  const [description, setDescription] = useState('');

  const [imgUrl, setImgUrl] = useState('');
  const [imgUrlHasError, setImgUrlHasError] = useState(false);

  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbUrlHasError, setImdbUrlHasError] = useState(false);

  const [imdbId, setImdbId] = useState('');
  const [imdbIdHasError, setImdbIdHasError] = useState(false);

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleHasError(false);
  };

  const handleDescription = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  const handleImgUrl = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImgUrl(event.target.value);
    setImgUrlHasError(false);
  };

  const handleImdbUrl = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImdbUrl(event.target.value);
    setImdbUrlHasError(false);
  };

  const handleImdbId = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImdbId(event.target.value);
    setImdbIdHasError(false);
  };

  const handleSumbit = (event: React.FormEvent) => {
    event.preventDefault();

    const movie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    setTitleHasError(!title);
    setImgUrlHasError(!imgUrl);
    setImdbUrlHasError(!imdbUrl);
    setImdbIdHasError(!imdbId);

    if (title && imgUrl && imdbUrl && imdbId) {
      onAdd(movie);

      setTitle('');
      setDescription('');
      setImgUrl('');
      setImdbUrl('');
      setImdbId('');
    }
  };

  return (
    <form
      onSubmit={handleSumbit}
    >
      <h2 className="title">Add a new movie</h2>

      <label className="label">
        <h3>
          Title
        </h3>

        <input
          type="text"
          className={classNames('input', { inputError: titleHasError })}
          name="title"
          placeholder="Enter a title"
          value={title}
          onChange={handleTitle}
        />
        {titleHasError && (
          <p className="help is-danger">Enter a title</p>
        )}
      </label>

      <label className="label">
        <h3>Description</h3>
        <textarea
          name="description"
          className="description textarea"
          placeholder="Enter a description"
          maxLength={500}
          value={description}
          onChange={handleDescription}
        />
      </label>

      <label className="label">
        <h3>
          Image
        </h3>

        <input
          type="text"
          className={classNames('input', { inputError: imgUrlHasError })}
          name="imgUrl"
          placeholder="Enter an imgUrl"
          value={imgUrl}
          onChange={handleImgUrl}
        />
        {imgUrlHasError && (
          <p className="help is-danger">Enter an imgUrl</p>
        )}
      </label>

      <label className="label">
        <h3>
          IMDB
        </h3>

        <input
          type="text"
          className={classNames('input', { inputError: imdbUrlHasError })}
          name="imdbUrl"
          placeholder="Enter an imdbUrl"
          value={imdbUrl}
          onChange={handleImdbUrl}
        />
        {imdbUrlHasError && (
          <p className="help is-danger">Enter an imdbUrl</p>
        )}
      </label>

      <label className="label">
        <h3>
          IMDB ID
        </h3>

        <input
          type="text"
          className={classNames('input', { inputError: imdbIdHasError })}
          name="imdbId"
          placeholder="Enter an IMDB ID"
          value={imdbId}
          onChange={handleImdbId}
        />
        {imdbIdHasError && (
          <p className="help is-danger">Enter an IMDB ID</p>
        )}
      </label>

      <button
        type="submit"
        className="button is-link"
      >
        Add
      </button>
    </form>
  );
};
