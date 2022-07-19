import classnames from 'classnames';
import React, { useState } from 'react';
import './NewMovie.scss';

type Props = {
  onAdd: (movie: Movie) => void;
  movies: Movie[]
};

export const NewMovie: React.FC<Props> = ({ onAdd, movies }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imdbId, setImdbId] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [titleError, setTitleError] = useState('');
  const [imdbIdError, setImdbIdError] = useState('');
  const [imgUrlError, setImgUrlError] = useState('');
  const [imdbUrlError, setImdbUrlError] = useState('');
  const checkRepeatedId = movies.some(movie => movie.imdbId === imdbId);
  // eslint-disable-next-line max-len
  const isButtonDisabled = !title || !imdbId || !imgUrl || !imdbUrl || checkRepeatedId;

  const errorPhrase = (atr: string) => {
    return `Enter ${atr}, please`;
  };

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
  };

  const validateField = (
    atr: string,
    func: (value: React.SetStateAction<string>) => void,
    atrName: string,
  ) => {
    func('');

    if (!atr) {
      func(errorPhrase(atrName));
    }
  };

  const reset = () => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  const handleChange = () => {
    if (title && imdbId.length === 9 && imgUrl && imdbUrl && !checkRepeatedId) {
      onAdd({
        title,
        description,
        imdbId,
        imgUrl,
        imdbUrl,
      });

      reset();
    }
  };

  const controlValidId = (str: string) => {
    return str.split('').map((char, i) => {
      if (i < 2) {
        return 't';
      }

      return char;
    }).filter((_, i) => i < 9).join('');
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="form">
        <div className="form__unit">
          <input
            type="text"
            name="title"
            placeholder="title"
            className={classnames('input form__input', {
              'is-danger': !title && titleError,
              'is-primary': title,
            })}
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
            }}
            onClick={() => {
              validateField(title, setTitleError, 'title');
            }}
          />
          <p className="form__error">{!title && titleError}</p>
        </div>

        <div className="form__unit">
          <input
            type="text"
            name="description"
            placeholder="description"
            className={classnames('input form__input', {
              'is-primary': description,
            })}
            value={description}
            onChange={(event) => {
              setDescription(event.target.value);
            }}
          />
        </div>

        <div className="form__unit">
          <input
            type="text"
            name="imdbId"
            placeholder="id (must have 9 symbols)"
            className={classnames('input form__input', {
              'is-danger': (!imdbId && imdbIdError)
              || (imdbIdError && checkRepeatedId),
              'is-primary': imdbId,
            })}
            value={imdbId}
            onChange={(event) => {
              setImdbId(controlValidId(event.target.value));

              if (checkRepeatedId) {
                setImdbIdError('Use another id please');
              } else {
                setImdbIdError('');
              }
            }}
            onClick={() => {
              validateField(imdbId, setImdbIdError, 'id');
            }}
          />
          <p className="form__error">
            {(!imdbId && imdbIdError) || (checkRepeatedId && imdbIdError)}
          </p>
        </div>

        <div className="form__unit">
          <input
            type="text"
            name="imgUrl"
            placeholder="image url"
            value={imgUrl}
            className={classnames('input form__input', {
              'is-danger': !imgUrl && imgUrlError,
              'is-primary': imgUrl,
            })}
            onChange={(event) => {
              setImgUrl(event.target.value);
            }}
            onClick={() => {
              validateField(imgUrl, setImgUrlError, 'image URL');
            }}
          />
          <p className="form__error">{!imgUrl && imgUrlError}</p>
        </div>

        <div className="form__unit">
          <input
            type="text"
            name="imdbUrl"
            placeholder="imbd url"
            className={classnames('input form__input', {
              'is-danger': !imdbUrl && imdbUrlError,
              'is-primary': imdbUrl,
            })}
            value={imdbUrl}
            onChange={(event) => {
              setImdbUrl(event.target.value);
            }}
            onClick={() => {
              validateField(imdbUrl, setImdbUrlError, 'imdb URL');
            }}
          />
          <p className="form__error">{!imdbUrl && imdbUrlError}</p>
        </div>

        <button
          type="submit"
          className={classnames('button is-primary', {
            'is-danger': isButtonDisabled,
          })}
          onClick={handleChange}
          disabled={isButtonDisabled}
        >
          Add movie
        </button>
      </form>
    </>
  );
};
