import { useEffect, useState } from 'react';
import classnames from 'classnames';

type Props = {
  addMovie: (movie: Movie) => void;
};

interface Validation {
  isTitleValid: null | boolean,
  isImgValid: null | boolean,
  isUrlValid: null | boolean,
  isIdValid: null | boolean,
  isMovieValid: boolean
}

// eslint-disable-next-line max-len
const regex = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

export const NewMovie: React.FC<Props> = ({ addMovie }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const defaultValidation: Validation = {
    isTitleValid: null,
    isImgValid: null,
    isUrlValid: null,
    isIdValid: null,
    isMovieValid: false,
  };

  const [validation, setValidation] = useState(defaultValidation);

  const {
    isTitleValid, isIdValid, isUrlValid, isImgValid, isMovieValid,
  } = validation;

  const validateProp = (value: string, prop: string) => {
    let condition;

    switch (prop) {
      case 'isImgValid':
      case 'isUrlValid':
        condition = regex.test(value);
        break;
      case 'isMovieValid':
        condition = isTitleValid && isIdValid && isImgValid && isUrlValid;
        break;
      default:
        condition = value.trim().length;
    }

    if (condition) {
      setValidation(prev => ({ ...prev, [prop]: true }));
    } else {
      setValidation(prev => ({ ...prev, [prop]: false }));
    }
  };

  useEffect(() => {
    validateProp('', 'isMovieValid');
  }, [isTitleValid, isIdValid, isUrlValid, isImgValid]);

  const resetAll = () => {
    setTitle('');
    setDescription('');
    setImdbUrl('');
    setImgUrl('');
    setImdbId('');
    setValidation(defaultValidation);
  };

  const handleSubmit = () => {
    if (isMovieValid) {
      addMovie({
        title, description, imdbUrl, imgUrl, imdbId,
      });
      resetAll();
    }
  };

  return (
    <form className="form">
      <div className="field">
        <input
          type="text"
          className={classnames('input', {
            'is-success': isTitleValid,
            'is-danger': isTitleValid === false,
          })}
          data-cy="form-title"
          placeholder="Movie title"
          value={title}
          required
          onChange={({ target }) => {
            setTitle(target.value);
            validateProp(target.value, 'isTitleValid');
          }}
        />
      </div>
      <div className="field">
        <input
          type="text"
          className={classnames('input', {
            'is-success': description.length,
          })}
          data-cy="form-description"
          placeholder="Description"
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
      </div>
      <div className="field">
        <input
          type="text"
          className={classnames('input', {
            'is-success': isUrlValid,
            'is-danger': isUrlValid === false,
          })}
          data-cy="form-imdbUrl"
          placeholder="URL"
          value={imdbUrl}
          required
          onChange={({ target }) => {
            setImdbUrl(target.value);
            validateProp(target.value, 'isUrlValid');
          }}
        />
      </div>
      <div className="field">
        <input
          type="text"
          className={classnames('input', {
            'is-success': isIdValid,
            'is-danger': isIdValid === false,
          })}
          data-cy="form-imdbId"
          placeholder="Id"
          value={imdbId}
          required
          onChange={({ target }) => {
            setImdbId(target.value);
            validateProp(target.value, 'isIdValid');
          }}
        />
      </div>
      <div className="field">
        <input
          type="text"
          className={classnames('input', {
            'is-success': isImgValid === true,
            'is-danger': isImgValid === false,
          })}
          data-cy="form-imgUrl"
          placeholder="Movie image"
          value={imgUrl}
          required
          onChange={({ target }) => {
            setImgUrl(target.value);
            validateProp(target.value, 'isImgValid');
          }}
        />
      </div>
      <button
        type="submit"
        disabled={!isMovieValid}
        className="button is-success"
        data-cy="form-submit-button"
        onClick={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        Add movie
      </button>
    </form>
  );
};
