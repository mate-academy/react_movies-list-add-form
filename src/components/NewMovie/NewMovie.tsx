import { useEffect, useState } from 'react';
import classnames from 'classnames';
import './NewMovie.scss';

type Props = {
  onAdd: (movie: Movie) => void
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');
  const [titleDirty, setTitleDirty] = useState(false);
  const [imgUrlDirty, setImgUrlDirty] = useState(false);
  const [imdbUrlDirty, setImdbUrlDirty] = useState(false);
  const [imdbIdDirty, setImdbIdDirty] = useState(false);
  const [titleError, setTitleError] = useState(
    'The Title field cannot be empty',
  );
  const [imgUrlError, setImgUrlError] = useState(
    'The imgUrl field cannot be empty',
  );
  const [imdbUrlError, setImdbUrlError] = useState(
    'The imdbUrl field cannot be empty',
  );
  const [imdbIdError, setImdbIdError] = useState(
    'The imdbId field cannot be empty',
  );
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    if (titleError || imgUrlError || imdbUrlError || imdbIdError) {
      setIsFormValid(false);
    } else {
      setIsFormValid(true);
    }
  }, [titleError, imgUrlError, imdbUrlError, imdbIdError]);

  const blurHandler = (event: React.FocusEvent<HTMLInputElement, Element>) => {
    switch (event.target.name) {
      case 'title':
        setTitleDirty(true);
        break;
      case 'imgUrl':
        setImgUrlDirty(true);
        break;
      case 'imdbUrl':
        setImdbUrlDirty(true);
        break;
      case 'imdbId':
        setImdbIdDirty(true);
        break;

      default:
        break;
    }
  };

  const titleHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setTitle(value);

    if (value) {
      setTitleError('');
    } else {
      setTitleError('The Title field cannot be empty');
    }
  };

  const descriptionHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setDescription(value);
  };

  const imgUrlHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setImgUrl(value);
    // eslint-disable-next-line max-len
    const regex = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

    if (!regex.test(String(value).toLowerCase())) {
      setImgUrlError('Incorrect url');
    } else {
      setImgUrlError('');
    }
  };

  const imdbUrlHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setImdbUrl(value);
    // eslint-disable-next-line max-len
    const regex = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

    if (!regex.test(String(value).toLowerCase())) {
      setImdbUrlError('Incorrect url');
    } else {
      setImdbUrlError('');
    }
  };

  const imdbIdHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setImdbId(value);

    if (value) {
      setImdbIdError('');
    } else {
      setImdbIdError('The imdbId field cannot be empty');
    }
  };

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newMovie = {
      title,
      description: description || 'No description',
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
    <form onSubmit={submitHandler}>
      <div className="mb-3">
        <input
          type="text"
          name="title"
          value={title}
          onChange={titleHandler}
          onBlur={blurHandler}
          placeholder="Enter a title"
          className={classnames(
            'form-control shadow-none p-3 mb-5 bg-light rounded', {
              error: titleDirty && titleError,
            },
          )}
        />
      </div>
      {(titleDirty && titleError)
      && <div style={{ color: 'red' }}>{titleError}</div>}
      <div className="mb-3">
        <input
          type="text"
          name="description"
          value={description}
          onChange={descriptionHandler}
          placeholder="Enter a description"
          className="form-control shadow-none p-3 mb-5 bg-light rounded"
        />
      </div>
      <div className="mb-3">
        <input
          type="url"
          name="imgUrl"
          value={imgUrl}
          onChange={imgUrlHandler}
          onBlur={blurHandler}
          placeholder="Enter an imgUrl"
          className={classnames(
            'form-control shadow-none p-3 mb-5 bg-light rounded', {
              error: imgUrlDirty && imgUrlError,
            },
          )}
        />
      </div>
      {(imgUrlDirty && imgUrlError)
      && <div style={{ color: 'red' }}>{imgUrlError}</div>}
      <div className="mb-3">
        <input
          type="url"
          name="imdbUrl"
          value={imdbUrl}
          onChange={imdbUrlHandler}
          placeholder="Enter an imdbUrl"
          onBlur={blurHandler}
          className={classnames(
            'form-control shadow-none p-3 mb-5 bg-light rounded', {
              error: imdbUrlDirty && imdbUrlError,
            },
          )}
        />
      </div>
      {(imdbUrlDirty && imdbUrlError)
      && <div style={{ color: 'red' }}>{imdbUrlError}</div>}
      <div className="mb-3">
        <input
          type="text"
          name="imdbId"
          value={imdbId}
          onChange={imdbIdHandler}
          placeholder="Enter an imdbId"
          onBlur={blurHandler}
          className={classnames(
            'form-control shadow-none p-3 mb-5 bg-light rounded', {
              error: imdbIdDirty && imdbIdError,
            },
          )}
        />
      </div>
      {(imdbIdDirty && imdbIdError)
      && <div style={{ color: 'red' }}>{imdbIdError}</div>}
      <button
        type="submit"
        disabled={!isFormValid}
        className={classnames('btn btn-info', {
          'btn-outline-secondary': !isFormValid,
        })}
      >
        Add
      </button>
    </form>
  );
};
