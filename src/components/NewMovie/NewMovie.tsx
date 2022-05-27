import { useState } from 'react';
import classNames from 'classnames';
import './NewMovie.scss';

type Props = {
  onAddMovie: (movie: Movie) => void;
};

// eslint-disable-next-line max-len
const imgUrlPattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;
const imdbUrlPattern = /^[\w]{3,9}:(?:\/\/)www\.imdb\.com\/title\/\w{2}\d{7}$/;
const imdbIdPattern = /^\w{2}\d{7}$/;

export const NewMovie: React.FC<Props> = ({ onAddMovie }) => {
  const [state, setState] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const [error, setError] = useState({
    errorForTitle: '',
    errorForImgUrl: '',
    errorForImdbUrl: '',
    errorForImdbId: '',
  });

  const isFormValid = () => {
    const {
      title,
      imgUrl,
      imdbUrl,
      imdbId,
    } = state;

    return title
      && imdbUrl
      && imdbUrl
      && imdbId
      && imgUrlPattern.test(imgUrl)
      && imdbUrlPattern.test(imdbUrl)
      && imdbIdPattern.test(imdbId);
  };

  const submitForm: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = state;

    const refreshState = () => {
      setState({
        title: '',
        description: '',
        imgUrl: '',
        imdbUrl: '',
        imdbId: '',
      });
    };

    if (isFormValid()) {
      onAddMovie({
        title,
        description,
        imgUrl,
        imdbUrl,
        imdbId,
      });

      refreshState();
    }
  };

  const isValidImgUrl = () => {
    const { imgUrl } = state;

    return imgUrl || imgUrlPattern.test(imgUrl);
  };

  const isValidImdbUrl = () => {
    const { imdbUrl } = state;

    return imdbUrl || imdbUrlPattern.test(imdbUrl);
  };

  const isValidImdbId = () => {
    const { imdbId } = state;

    return imdbId || imdbIdPattern.test(imdbId);
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
            { 'form__input-error': error.errorForTitle === '*Enter a title' },
          )}
          placeholder="Movie name"
          value={state.title}
          onChange={(e) => {
            setState(prev => ({ ...prev, title: e.target.value }));
            setError(prev => ({ ...prev, errorForTitle: '' }));
          }}
          onBlur={() => (
            !state.title
            && setError(prev => ({
              ...prev, errorForTitle: '*Enter a title',
            }))
          )}
        />
        <span className="form__span">
          {error.errorForTitle}
        </span>
      </label>

      <label htmlFor="description" className="form__label">
        <textarea
          id="description"
          name="description"
          className="form__textarea"
          placeholder="Movie description (optional)"
          value={state.description}
          cols={55}
          rows={5}
          onChange={(e) => {
            setState(prev => ({ ...prev, description: e.target.value }));
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
              'form__input-error': error.errorForImgUrl
                === '*Enter a valid image URL',
            },
          )}
          placeholder="Image URL"
          value={state.imgUrl}
          onChange={(e) => {
            setState(prev => ({ ...prev, imgUrl: e.target.value }));
            setError(prev => ({
              ...prev, errorForImgUrl: '',
            }));
          }}
          onBlur={() => (
            !isValidImgUrl()
            && setError(prev => ({
              ...prev, errorForImgUrl: '*Enter a valid image URL',
            }))
          )}
        />
        <span className="form__span">
          {error.errorForImgUrl}
        </span>
      </label>

      <label htmlFor="imdbUrl" className="form__label">
        <input
          id="imdbUrl"
          type="text"
          className={classNames(
            'form__input',
            {
              'form__input-error': error.errorForImdbUrl
                === '*Enter a valid imdb URL',
            },
          )}
          placeholder="Imdb URL"
          value={state.imdbUrl}
          onChange={(e) => {
            setState(prev => ({ ...prev, imdbUrl: e.target.value }));
            setError(prev => ({ ...prev, errorForImdbUrl: '' }));
          }}
          onBlur={() => (
            !isValidImdbUrl()
            && setError(prev => ({
              ...prev, errorForImdbUrl: '*Enter a valid imdb URL',
            }))
          )}
        />
        <span className="form__span">
          {error.errorForImdbUrl}
        </span>
      </label>

      <label htmlFor="imdbId" className="form__label">
        <input
          id="imdbId"
          type="text"
          className={classNames(
            'form__input',
            {
              'form__input-error': error.errorForImdbId
                === '*Enter a valid imdb ID',
            },
          )}
          placeholder="Imdb ID"
          value={state.imdbId}
          onChange={(e) => {
            setState(prev => ({ ...prev, imdbId: e.target.value }));
            setError(prev => ({ ...prev, errorForImdbId: '' }));
          }}
          onBlur={() => (
            !isValidImdbId()
            && setError(prev => ({
              ...prev, errorForImdbId: '*Enter a valid imdb ID',
            }))
          )}
        />
        <span className="form__span">
          {error.errorForImdbId}
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
