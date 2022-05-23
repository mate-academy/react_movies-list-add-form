import { useState } from 'react';
import classNames from 'classnames';
import './NewMovie.scss';

type Props = {
  onAddMovie: (movie: Movie) => void;
};

// eslint-disable-next-line max-len
const imgUrlPattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;
const imdbUrlPattern = /\w{3,9}:(?:\/\/)www\.imdb\.com\/title\/\w{2}\d{7}/;
const imdbIdPattern = /\w{2}\d{7}/;

export const NewMovie: React.FC<Props> = ({ onAddMovie }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const [errorForTitle, setErrorForTitle] = useState('');
  const [errorForImgUrl, setErrorForImgUrl] = useState('');
  const [errorForImdbUrl, setErrorForImdbUrl] = useState('');
  const [errorForImdbId, setErrorForImdbId] = useState('');

  const isFormValid = () => {
    if (
      title
      && imdbUrl
      && imdbUrl
      && imdbId
      && imgUrlPattern.test(imgUrl)
      && imdbUrlPattern.test(imdbUrl)
      && imdbIdPattern.test(imdbId)
    ) {
      return true;
    }

    return false;
  };

  const submitForm: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (isFormValid()) {
      onAddMovie({
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
  };

  const isValidImgUrl = () => {
    if (!imgUrl || !imgUrlPattern.test(imgUrl)) {
      return false;
    }

    return true;
  };

  const isValidImdbUrl = () => {
    if (!imdbUrl || !imdbUrlPattern.test(imdbUrl)) {
      return false;
    }

    return true;
  };

  const isValidImdbId = () => {
    if (!imdbId || !imdbIdPattern.test(imdbId)) {
      return false;
    }

    return true;
  };

  return (
    <form
      className="form"
      onSubmit={submitForm}
    >
      <label htmlFor="title" className="form__label">
        <input
          id="title"
          type="text"
          className={classNames(
            'form__input',
            { 'form__input-error': errorForTitle === '*Enter a title' },
          )}
          placeholder="Movie name"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setErrorForTitle('');
          }}
          onBlur={() => (
            !title && setErrorForTitle('*Enter a title')
          )}
        />
        <span className="form__span">
          {errorForTitle}
        </span>
      </label>

      <label htmlFor="description" className="form__label">
        <textarea
          id="description"
          name="description"
          className="form__textarea"
          placeholder="Movie description (optional)"
          value={description}
          cols={55}
          rows={5}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
      </label>

      <label htmlFor="imgUrl" className="form__label">
        <input
          id="imgUrl"
          type="text"
          className={classNames(
            'form__input',
            {
              'form__input-error': errorForImgUrl
                === '*Enter a valid image URL',
            },
          )}
          placeholder="Image URL"
          value={imgUrl}
          onChange={(e) => {
            setImgUrl(e.target.value);
            setErrorForImgUrl('');
          }}
          onBlur={() => (
            !isValidImgUrl() && setErrorForImgUrl('*Enter a valid image URL')
          )}
        />
        <span className="form__span">
          {errorForImgUrl}
        </span>
      </label>

      <label htmlFor="imdbUrl" className="form__label">
        <input
          id="imdbUrl"
          type="text"
          className={classNames(
            'form__input',
            {
              'form__input-error': errorForImdbUrl
                === '*Enter a valid imdb URL',
            },
          )}
          placeholder="Imdb URL"
          value={imdbUrl}
          onChange={(e) => {
            setImdbUrl(e.target.value);
            setErrorForImdbUrl('');
          }}
          onBlur={() => (
            !isValidImdbUrl() && setErrorForImdbUrl('*Enter a valid imdb URL')
          )}
        />
        <span className="form__span">
          {errorForImdbUrl}
        </span>
      </label>

      <label htmlFor="imdbId" className="form__label">
        <input
          id="imdbId"
          type="text"
          className={classNames(
            'form__input',
            {
              'form__input-error': errorForImdbId
                === '*Enter a valid imdb ID',
            },
          )}
          placeholder="Imdb ID"
          value={imdbId}
          onChange={(e) => {
            setImdbId(e.target.value);
            setErrorForImdbId('');
          }}
          onBlur={() => (
            !isValidImdbId() && setErrorForImdbId('*Enter a valid imdb ID')
          )}
        />
        <span className="form__span">
          {errorForImdbId}
        </span>
      </label>

      <button
        type="submit"
        className={classNames(
          'form__button--not-active',
          { form__button: isFormValid() },
        )}
        disabled={!isFormValid()}
      >
        Add a new movie
      </button>
    </form>
  );
};
