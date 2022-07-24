import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';

type Props = {
  onAddMovie: (movie: Movie) => void
};

enum FieldName {
  Title = 'title',
  ImgUrl = 'imgUrl',
  ImdbUrl = 'imdbUrl',
  ImdbId = 'imdbId',
}

export const NewMovie:React.FC<Props> = ({ onAddMovie: addMovie }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');
  const [hasTitleError, setTitleError] = useState(false);
  const [hasImgUrlError, setImgUrlError] = useState(false);
  const [hasImdbUrlError, setImdbUrlError] = useState(false);
  const [hasImdbIdError, setImdbIdError] = useState(false);
  const [isDisabledBtn, setStatusBtn] = useState(true);

  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      setStatusBtn(
        (hasImdbIdError
        || hasImdbUrlError
        || hasImgUrlError
        || hasTitleError),
      );
    }
  }, [hasTitleError, hasImgUrlError, hasImdbUrlError, hasImdbIdError]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const newMovie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    event.preventDefault();
    event.currentTarget.reset();

    addMovie(newMovie);

    setImgUrl('');
    setImdbId('');
    setImdbUrl('');
    setTitle('');
    setDescription('');
  };

  // eslint-disable-next-line max-len
  const regex = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

  const handleOnBlur = (event: React.FocusEvent<HTMLInputElement, Element>) => {
    const { value, name } = event.target;

    switch (name) {
      case FieldName.Title:
        setTitleError(!value);
        break;

      case FieldName.ImgUrl:
        setImgUrlError(!regex.test(value) || !value);
        break;

      case FieldName.ImdbUrl:
        setImdbUrlError(!regex.test(value) || !value);
        break;

      case FieldName.ImdbId:
        setImdbIdError(!value);
        break;

      default:
        break;
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="title" className="label">
          Title
        </label>
        <div className="control">
          <input
            className={
              classNames(
                'input',
                { 'is-danger': hasTitleError },
              )
            }
            type="text"
            name="title"
            id="title"
            value={title}
            placeholder="Enter the title"
            data-cy="form-title"
            onBlur={handleOnBlur}
            onChange={(event) => setTitle(event.target.value)}
          />

          {hasTitleError && (
            <p className="help is-danger">Please enter the title</p>
          )}
        </div>
      </div>

      <div className="field">
        <label htmlFor="description" className="label">
          Description
        </label>

        <div className="control">
          <textarea
            className="textarea"
            name="description"
            id="description"
            placeholder="Write description"
            data-cy="form-description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>
      </div>

      <div className="field">
        <label htmlFor="imgUrl" className="label">
          imgUrl
        </label>

        <div className="control">
          <input
            className={
              classNames(
                'input',
                { 'is-danger': hasImgUrlError },
              )
            }
            type="text"
            name="imgUrl"
            id="imgUrl"
            placeholder="Enter url for cover"
            data-cy="form-imgUrl"
            value={imgUrl}
            onBlur={handleOnBlur}
            onChange={(event) => setImgUrl(event.target.value)}
          />
          {hasImgUrlError && (
            <p className="help is-danger">
              This is a required field and must be a URL
            </p>
          )}
        </div>
      </div>

      <div className="field">
        <label htmlFor="imdbUrl" className="label">
          Url
        </label>

        <div className="control">
          <input
            className={
              classNames(
                'input',
                { 'is-danger': hasImdbUrlError },
              )
            }
            type="text"
            name="imdbUrl"
            id="imdbUrl"
            placeholder="Enter url for the movie"
            data-cy="form-imdbUrl"
            value={imdbUrl}
            onBlur={handleOnBlur}
            onChange={(event) => setImdbUrl(event.target.value)}
          />
          {hasImdbUrlError && (
            <p className="help is-danger">
              This is a required field and must be a URL
            </p>
          )}
        </div>
      </div>

      <div className="field">
        <label htmlFor="imdbId" className="label">
          Id
        </label>

        <div className="control">
          <input
            className={
              classNames(
                'input',
                { 'is-danger': hasImdbIdError },
              )
            }
            type="text"
            name="imdbId"
            id="imdbId"
            placeholder="Enter Id of movie"
            data-cy="form-imdbId"
            value={imdbId}
            onBlur={handleOnBlur}
            onChange={(event) => setImdbId(event.target.value)}
          />
          {hasImdbIdError && (
            <p className="help is-danger">Please enter Id</p>
          )}
        </div>
      </div>

      <button
        className="button is-success"
        type="submit"
        data-cy="form-submit-button"
        disabled={isDisabledBtn}
      >
        Add movie
      </button>
    </form>
  );
};
