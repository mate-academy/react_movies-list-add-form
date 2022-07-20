import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  onAdd: (newMovie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('No description');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');
  const validUrl = new RegExp(
    // eslint-disable-next-line max-len
    /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/,
  );
  const validation = (
    prevClass: string,
    input: string,
    url = false,
  ) => {
    if (url) {
      return classNames(
        prevClass,
        { 'is-danger': !validUrl.test(input) },
        { 'is-success': validUrl.test(input) },
      );
    }

    return classNames(
      prevClass,
      { 'is-danger': !input },
      { 'is-success': input },
    );
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();

        if (title
          && validUrl.test(imgUrl)
          && validUrl.test(imdbUrl)
          && imdbId) {
          onAdd({
            title,
            description,
            imgUrl,
            imdbUrl,
            imdbId,
          });
        }
      }}
    >
      <div
        className="field"
      >
        <label className="label" htmlFor="title">
          Type a title of a Movie
        </label>

        <div
          className="control has-icons-right"
        >
          <input
            id="title"
            className={validation('input', title)}
            type="text"
            placeholder="Title"
            data-cy="form-title"
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />

          <span className="icon is-small is-right">
            <i className="fas fa-check">{title ? '✓' : '✖'}</i>
          </span>
        </div>

        <p className={validation('help', title)}>
          {title ? 'This title is correct' : 'This title is invalid'}
        </p>
      </div>

      <div
        className="field"
      >
        <label className="label" htmlFor="description">
          Type a description of a Movie
        </label>

        <div
          className="control has-icons-right"
        >
          <input
            id="description"
            className="input is-success"
            type="text"
            placeholder="No description"
            data-cy="form-description"
            onChange={(event) => {
              setDescription(event.target.value);
            }}
          />

          <span className="icon is-small is-right">
            <i className="fas fa-check">✓</i>
          </span>
        </div>

        <p className="help is-success">
          Description is optional
        </p>
      </div>

      <div
        className="field"
      >
        <label className="label" htmlFor="imgUrl">
          Type a imgUrl of a Movie
        </label>

        <div
          className="control has-icons-right"
        >
          <input
            id="imgUrl"
            className={validation('input', imgUrl, true)}
            type="text"
            placeholder="ImgUrl"
            data-cy="form-imgUrl"
            onChange={(event) => {
              setImgUrl(event.target.value);
            }}
          />

          <span className="icon is-small is-right">
            <i className="fas fa-check">{validUrl.test(imgUrl) ? '✓' : '✖'}</i>
          </span>
        </div>

        <p className={validation('help', imgUrl, true)}>
          {validUrl.test(imgUrl)
            ? 'This imgUrl is correct'
            : 'This link imgUrl is invalid'}
        </p>
      </div>

      <div
        className="field"
      >
        <label className="label" htmlFor="imdbUrl">
          Type a imdbUrl of a Movie
        </label>

        <div
          className="control has-icons-right"
        >
          <input
            id="imdbUrl"
            className={validation('input', imdbUrl, true)}
            type="text"
            placeholder="ImdbUrl"
            data-cy="form-imdbUrl"
            onChange={(event) => {
              setImdbUrl(event.target.value);
            }}
          />

          <span className="icon is-small is-right">
            <i className="fas fa-check">{validUrl.test(imdbUrl) ? '✓' : '✖'}</i>
          </span>
        </div>

        <p className={validation('help', imdbUrl, true)}>
          {validUrl.test(imdbUrl)
            ? 'This imdbUrl is correct'
            : 'This link imdbUrl is invalid'}
        </p>
      </div>

      <div
        className="field"
      >
        <label className="label" htmlFor="imdbId">
          Type a imdbId of a Movie
        </label>

        <div
          className="control has-icons-right"
        >
          <input
            id="imdbId"
            className={validation('input', imdbId)}
            type="text"
            placeholder="ImdbId"
            data-cy="form-imdbId"
            onChange={(event) => {
              setImdbId(event.target.value);
            }}
          />

          <span className="icon is-small is-right">
            <i className="fas fa-check">{imdbId ? '✓' : '✖'}</i>
          </span>
        </div>

        <p className={validation('help', imdbId)}>
          {imdbId
            ? 'This imdbId is correct'
            : 'This imdbId is invalid'}
        </p>
      </div>

      <button
        className="button is-success"
        type="submit"
        data-cy="form-submit-button"
      >
        <span>Save</span>
      </button>
    </form>
  );
};
