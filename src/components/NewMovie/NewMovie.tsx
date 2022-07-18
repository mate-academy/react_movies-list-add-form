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

  const errorPhrase = (atr: string) => {
    return `Enter ${atr}, please`;
  };

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
  };

  const setErrorMessage = (
    atr: string,
    func: (value: React.SetStateAction<string>) => void,
    atrName: string,
  ) => {
    func('');

    if (!atr) {
      func(errorPhrase(atrName));
    }

    if (atrName === 'id' && checkRepeatedId) {
      func('Same id is not available');
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

    if (checkRepeatedId) {
      setImdbIdError('Use another id please');
    } else {
      setImdbIdError('');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="form">
        <div className="form__unit">
          <input
            type="text"
            name="title"
            className={classnames('input form__input', {
              'is-danger': titleError,
              'is-primary': title,
            })}
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
              setErrorMessage(title, setTitleError, 'title');
            }}
            onClick={() => {
              setErrorMessage(title, setTitleError, 'title');
            }}
          />
          <p className="form__error">{titleError}</p>
        </div>

        <div className="form__unit">
          <input
            type="text"
            name="description"
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
            className={classnames('input form__input', {
              'is-danger': imdbIdError,
              'is-primary': imdbId,
            })}
            value={imdbId}
            onChange={(event) => {
              setErrorMessage(imdbId, setImdbIdError, 'id');
              setImdbId(event.target.value.split('').map((char, i) => {
                if (i < 2) {
                  return 't';
                }

                return char;
              }).filter((_, i) => i < 9).join(''));
            }}
            onClick={() => {
              setErrorMessage(imdbId, setImdbIdError, 'id');
            }}
          />
          <p className="form__error">{imdbIdError}</p>
        </div>

        <div className="form__unit">
          <input
            type="text"
            name="imgUrl"
            value={imgUrl}
            className={classnames('input form__input', {
              'is-danger': imgUrlError,
              'is-primary': imgUrl,
            })}
            onChange={(event) => {
              setImgUrl(event.target.value);
              setErrorMessage(imgUrl, setImgUrlError, 'image URL');
            }}
            onClick={() => {
              setErrorMessage(imgUrl, setImgUrlError, 'image URL');
            }}
          />
          <p className="form__error">{imgUrlError}</p>
        </div>

        <div className="form__unit">
          <input
            type="text"
            name="imdbUrl"
            className={classnames('input form__input', {
              'is-danger': imdbUrlError,
              'is-primary': imdbUrl,
            })}
            value={imdbUrl}
            onChange={(event) => {
              setImdbUrl(event.target.value);
              setErrorMessage(imdbUrl, setImdbUrlError, 'imdb URL');
            }}
            onClick={() => {
              setErrorMessage(imdbUrl, setImdbUrlError, 'imdb URL');
            }}
          />
          <p className="form__error">{imdbUrlError}</p>
        </div>

        <button
          type="submit"
          className="button is-primary"
          onClick={handleChange}
          disabled={!title || !imdbId || !imgUrl || !imdbUrl || checkRepeatedId}
        >
          Add movie
        </button>
      </form>
    </>
  );
};
