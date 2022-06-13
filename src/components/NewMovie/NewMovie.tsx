import React, { useState } from 'react';

import classNames from 'classnames';
import './NewMovie.scss';

interface Props {
  addMovie: (title: string,
    description: string,
    imgUrl: string,
    imdbUrl: string,
    imdbId: string,
  ) => void,
  movies: Movie[],
}

export const NewMovie: React.FC<Props> = ({ addMovie, movies }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');
  const [mistake, setMistake] = useState(false);

  const checkUrl = (url: string) => {
    // eslint-disable-next-line max-len
    return (/^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/).test(url);
  };

  const checkText = (text: string) => {
    return (/^[\w а-яА-я!?"'-:;.,]+$/).test(text);
  };

  const checkId = (id: string) => {
    return !movies.some((movie: Movie) => movie.imdbId === id);
  };

  const idFromUrl = (url: string) => {
    const startOfId = url.lastIndexOf('/tt') + 1;
    const lastSlesh = url.slice(startOfId).lastIndexOf('/');

    if (lastSlesh !== -1) {
      setImdbId(url.slice(startOfId, lastSlesh));
    }

    setImdbId(url.slice(startOfId));
  };

  const urlOnChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setImdbUrl(event.target.value);
    idFromUrl(event.target.value);
    setMistake(false);
  };

  const newFilmCard: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    // eslint-disable-next-line max-len
    if (checkUrl(imgUrl) && checkUrl(imdbUrl) && checkId(imdbId) && checkText(title) && checkText(description)) {
      addMovie(title, description, imgUrl, imdbUrl, imdbId);

      setTitle('');
      setDescription('');
      setImgUrl('');
      setImdbUrl('');
      setImdbId('');
    } else {
      setMistake(true);
    }
  };

  return (
    <form onSubmit={newFilmCard} className="column m-2">
      <input
        type="text"
        placeholder="The title of new movie"
        className={
          classNames('input m-1', { 'is-danger': mistake && !checkText(title) })
        }
        value={title}
        onChange={event => {
          setTitle(event.target.value);
          setMistake(false);
        }}
      />
      <input
        type="text"
        className={
          classNames(
            'input m-1',
            { 'is-danger': mistake && !checkText(description) },
          )
        }
        placeholder="Description of the movie"
        value={description}
        onChange={event => {
          setDescription(event.target.value);
          setMistake(false);
        }}
      />
      <input
        type="text"
        className={
          classNames('input m-1', { 'is-danger': mistake && !checkUrl(imgUrl) })
        }
        placeholder="Add URL at the poster"
        value={imgUrl}
        onChange={event => {
          setImgUrl(event.target.value);
          setMistake(false);
        }}
      />
      <input
        type="text"
        className={
          classNames('input m-1',
            {
              'is-danger': mistake && (!checkUrl(imdbUrl) || !checkId(imdbId)),
            })
        }
        placeholder="https://www.imdb.com/title/tt..."
        value={imdbUrl}
        onChange={urlOnChange}
      />
      <button
        type="submit"
        disabled={mistake}
        className="button m-2"
      >
        Add
      </button>
      <span
        className={classNames('input m-1',
          {
            massage: mistake,
            hide: !mistake,
          })}
      >
        Please, check your inputs
      </span>
    </form>
  );
};
