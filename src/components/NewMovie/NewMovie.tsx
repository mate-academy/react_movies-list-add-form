import React, { useState } from 'react';
import './NewMovie.scss';
import cn from 'classnames';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);

  const [description, setDescription] = useState('');

  const [imgUrl, setImgUrl] = useState('');
  const [imgUrlError, setImgUrlError] = useState(false);

  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbUrlError, setImdbUrlError] = useState(false);

  const [imdbId, setImdbId] = useState('');
  const [imdbIdError, setImdbIdError] = useState(false);

  const handleFormClear = () => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (title.trim().length < 1) {
      setTitleError(true);
    }

    if (imgUrl.trim().length < 6) {
      setImgUrlError(true);
    }

    if (imdbUrl.trim().length < 6) {
      setImdbUrlError(true);
    }

    if (imdbId.trim().length < 6) {
      setImdbIdError(true);
    }

    if (title.trim().length > 6
      && imgUrl.trim().length > 6
      && imdbUrl.trim().length > 6
      && imdbId.trim().length > 6) {
      const newMovie = {
        title,
        description,
        imgUrl,
        imdbUrl,
        imdbId,
      };

      onAdd(newMovie);
      handleFormClear();
    }
  };

  return (
    <form
      className="newMovie"
      name="newMovie"
      onSubmit={handleFormSubmit}
    >
      <input
        onBlur={(event) => {
          setTitleError(() => (
            event.target.value.trim().length < 1
          ));
        }}
        className="newMovie__input"
        name="title"
        type="text"
        placeholder="Enter the title"
        value={title}
        onChange={event => setTitle(event?.target.value)}
      />
      <span
        className={cn('disabled', {
          error: titleError,
        })}
      >
        Please enter the title
      </span>

      <input
        className="newMovie__input"
        name="description"
        type="text"
        placeholder="Enter the description"
        value={description}
        onChange={event => setDescription(event?.target.value)}
      />
      <span
        className="disabled"
      >
        Please enter the description
      </span>

      <input
        onBlur={(event) => {
          setImgUrlError(() => (
            event.target.value.trim().length < 6
          ));
        }}
        className="newMovie__input"
        name="imgUrl"
        type="text"
        placeholder="Enter the image URL"
        value={imgUrl}
        onChange={event => setImgUrl(event?.target.value)}
      />
      <span
        className={cn('disabled', {
          error: imgUrlError,
        })}
      >
        Please enter the image URL
      </span>

      <input
        onBlur={(event) => {
          setImdbUrlError(() => (
            event.target.value.trim().length < 6
          ));
        }}
        className="newMovie__input"
        name="imdbUrl"
        type="text"
        placeholder="Enter the IMDB URL"
        value={imdbUrl}
        onChange={event => setImdbUrl(event?.target.value)}
      />
      <span
        className={cn('disabled', {
          error: imdbUrlError,
        })}
      >
        Please enter the IMDB URL
      </span>

      <input
        onBlur={(event) => {
          setImdbIdError(() => (
            event.target.value.trim().length < 6
          ));
        }}
        className="newMovie__input"
        name="imdbId"
        type="text"
        placeholder="Enter the IMDB ID"
        value={imdbId}
        onChange={event => setImdbId(event?.target.value)}
      />
      <span
        className={cn('disabled', {
          error: imdbIdError,
        })}
      >
        Please enter the IMDB ID
      </span>

      <div>
        <button
          className="newMovie__button"
          type="submit"
        >
          Add new movie
        </button>
      </div>

    </form>
  );
};
