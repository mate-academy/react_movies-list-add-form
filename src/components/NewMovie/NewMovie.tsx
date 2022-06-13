/* eslint-disable max-len */
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [urlImgError, setUrlImgError] = useState(false);
  const [urlError, setUrlError] = useState(false);
  const [imdbIdError, setImdbIdError] = useState(false);
  const [disableButton, setDisabledButton] = useState(true);
  // eslint-disable-next-line max-len
  const validUrl = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

  const movieObj: Movie = {
    title,
    description,
    imgUrl,
    imdbUrl,
    imdbId,
  };

  useEffect(() => {
    if (
      imdbUrl
      && imgUrl
      && title.length > 0
      && description
      && imdbId
    ) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
  }, [imdbUrl, imgUrl, title, description, imdbId]);

  const validateImageUrl = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!validUrl.test(event.target.value)) {
      setUrlImgError(true);
    } else {
      setUrlImgError(false);
    }
  };

  const validateUrl = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!validUrl.test(event.target.value)) {
      setUrlError(true);
    } else {
      setUrlError(false);
    }
  };

  const hendlerSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      validUrl.test(imdbUrl)
      && validUrl.test(imgUrl)
      && !titleError
      && !descriptionError
      && !imdbIdError
    ) {
      onAdd(movieObj);
      setTitle('');
      setDescription('');
      setImdbId('');
      setImgUrl('');
      setImdbUrl('');
      setUrlError(false);
      setUrlImgError(false);
    }
  };

  return (
    <div className="sidebar">
      <h1 className="sidebar__title title is-4">Add new movie</h1>
      <form onSubmit={hendlerSubmit} className="sidebar__form">
        <input
          type="text"
          className="sidebar__input-title input my-3"
          value={title}
          placeholder="Enter the title"
          onChange={(event) => {
            setTitleError(false);
            setTitle(event.target.value);
          }}
        />
        <input
          type="text"
          className="sidebar__input-title input my-3"
          value={description}
          placeholder="Enter the description"
          onChange={(event) => {
            setDescriptionError(false);
            setDescription(event.target.value);
          }}
        />
        <input
          type="text"
          className={classNames(
            'sidebar__input-imgUrl input my-3',
            {
              'is-danger': urlImgError === true,
            },
          )}
          value={imgUrl}
          placeholder="Enter an basic image link"
          onChange={(event) => {
            setImgUrl(event.target.value);
            validateImageUrl(event);
          }}
        />
        {urlImgError && (
          <span className="has-text-danger">Incorrect url</span>
        )}
        <input
          type="text"
          className={classNames(
            'sidebar__input-imgUrl input my-3',
            {
              'is-danger': urlError === true,
            },
          )}
          value={imdbUrl}
          placeholder="Enter an link to IMDb movie"
          onChange={(event) => {
            setImdbUrl(event.target.value);
            validateUrl(event);
          }}
        />
        {urlError && (
          <span className="has-text-danger">Incorrect url</span>
        )}
        <input
          type="text"
          className="sidebar__input-title input my-3"
          value={imdbId}
          placeholder="Enter an resurs IMDb id"
          onChange={(event) => {
            setImdbIdError(false);
            setImdbId(event.target.value);
          }}
        />

        <div className="sidebar__button-box">
          <button
            className={classNames(
              'sidebar__button button is-success',
              {
                'is-static': disableButton,
              },
            )}
            type="submit"
          >
            Add movie
          </button>
        </div>
      </form>

      <div className="sidebar__text-box mt-6">
        <p className="sidebar__test-title">
          Test title:
          {' '}
          <b>The Batman</b>
        </p>
        <p className="sidebar__test-description">
          Test description:
          {' '}
          <b>
            {`When a sadistic serial killer begins murdering key political
          figures in Gotham, Batman is forced to investigate the city's
          hidden corruption and question his family's involvement.`}
          </b>
        </p>
        <p className="sidebar__test-imgUrl">
          Test Film Logo: (
          <i>copy link</i>
          )
          {' '}
          <a
            href="https://cly.1cdn.vn/2022/03/19/whatsappimage2022-01-26at75550pm-16466344716182124443472.jpeg"
            className="is-ghost"
          >
            <b>copy image link</b>
          </a>
        </p>
        <p className="sidebar__test-imdbUrl">
          Test Movie Link: (
          <i>copy link</i>
          )
          {' '}
          <a
            href="https://www.imdb.com/title/tt1877830/"
            className="is-ghost"
          >
            <b>copy movie link</b>
          </a>
        </p>
        <p className="sidebar__test-imdbId">
          Test imdbId:
          {' '}
          <b>tt1877830</b>
        </p>
      </div>
    </div>
  );
};
