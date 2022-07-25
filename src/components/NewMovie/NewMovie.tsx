import { useEffect, useState } from 'react';
import classnames from 'classnames';

type Props = {
  addMovie: (movie: Movie) => void;
};

// eslint-disable-next-line max-len
const regex = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

export const NewMovie: React.FC<Props> = ({ addMovie }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const [isTitleValid, setIsTitleValid] = useState<null | boolean>(null);
  const [isImgValid, setIsImgValid] = useState<null | boolean>(null);
  const [isUrlValid, setIsUrlValid] = useState<null | boolean>(null);
  const [isIdValid, setIsIdValid] = useState<null | boolean>(null);
  const [isMovieValid, setIsMovieValid] = useState(false);

  const checkIsMovieValid = () => {
    const movieIsValid = isTitleValid && isIdValid
    && isImgValid && isUrlValid;

    if (movieIsValid) {
      setIsMovieValid(true);
    } else {
      setIsMovieValid(false);
    }
  };

  useEffect(() => {
    checkIsMovieValid();
  }, [isTitleValid, isIdValid, isUrlValid, isImgValid]);

  const checkId = (id: string) => {
    setImdbId(id);

    if (id.trim().length) {
      setIsIdValid(true);
    } else {
      setIsIdValid(false);
    }
  };

  const checkTitle = (movieTitle: string) => {
    setTitle(movieTitle);

    if (movieTitle.trim().length) {
      setIsTitleValid(true);
    } else {
      setIsTitleValid(false);
    }
  };

  const checkImgUrl = (image: string) => {
    setImgUrl(image);

    if (regex.test(image)) {
      setIsImgValid(true);
    } else {
      setIsImgValid(false);
    }
  };

  const checkMovieUrl = (movieUrl: string) => {
    setImdbUrl(movieUrl);
    if (regex.test(movieUrl)) {
      setIsUrlValid(true);
    } else {
      setIsUrlValid(false);
    }
  };

  const resetAll = () => {
    setTitle('');
    setDescription('');
    setImdbUrl('');
    setImgUrl('');
    setImdbId('');
    setIsMovieValid(false);
    setIsTitleValid(null);
    setIsIdValid(null);
    setIsImgValid(null);
    setIsUrlValid(null);
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
            'is-danger': !isTitleValid && isTitleValid !== null,
          })}
          data-cy="form-title"
          placeholder="Movie title"
          value={title}
          required
          onChange={({ target }) => {
            checkTitle(target.value);
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
            'is-success': isUrlValid === true,
            'is-danger': imdbUrl.length && !isUrlValid,
          })}
          data-cy="form-imdbUrl"
          placeholder="URL"
          value={imdbUrl}
          required
          onChange={({ target }) => {
            checkMovieUrl(target.value);
          }}
        />
      </div>
      <div className="field">
        <input
          type="text"
          className={classnames('input', {
            'is-success': isIdValid,
            'is-danger': !isIdValid && isIdValid !== null,
          })}
          data-cy="form-imdbId"
          placeholder="Id"
          value={imdbId}
          required
          onChange={({ target }) => checkId(target.value)}
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
            checkImgUrl(target.value);
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
