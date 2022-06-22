import React, { FC, useState } from 'react';
import cn from 'classnames';
import './NewMovie.scss';

type Props = {
  addMovie: (movie: Movie) => void;
};

export const NewMovie: FC<Props> = ({ addMovie }) => {
  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [description, setDescription] = useState('');
  const [hasDescrError, setHasDescrError] = useState(false);

  const [imgUrl, setImgUrl] = useState('');
  const [hasImgUrlError, setHasImgUrlError] = useState(false);

  const [imdbUrl, setImdbUrl] = useState('');
  const [hasImdbUrlError, setHasImdbUrlError] = useState(false);

  const [imdbId, setImdbId] = useState('');
  const [hasImdbIdError, setHasImdbIdError] = useState(false);

  const movie = {
    title,
    description,
    imgUrl,
    imdbUrl,
    imdbId,
  };

  const validateInput = () => {
    if (!title) {
      setHasTitleError(true);
    }

    if (!description) {
      setHasDescrError(true);
    }

    if (!imgUrl) {
      setHasImgUrlError(true);
    }

    if (!imdbUrl) {
      setHasImdbUrlError(true);
    }

    if (!imdbId) {
      setHasImdbIdError(true);
    }
  };

  const submitValidForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    validateInput();

    if (title
      && description
      && imgUrl
      && imdbUrl
      && imdbId) {
      addMovie(movie);
      setTitle('');
      setDescription('');
      setImgUrl('');
      setImdbUrl('');
      setImdbId('');
    }
  };

  return (
    <form
      onSubmit={submitValidForm}
      className="form"
    >
      <label>
        Movie title:
        <input
          className={cn('form__label', { error: hasTitleError })}
          type="text"
          placeholder="Movie title"
          data-cy="form-title"
          value={title}
          onChange={(event) => {
            setHasTitleError(false);
            setTitle(event.target.value);
          }}
        />
      </label>

      <label>
        Movie description:
        <textarea
          className={cn('form__label', { error: hasDescrError })}
          placeholder="Movie description"
          data-cy="form-description"
          rows={3}
          cols={30}
          value={description}
          onChange={(event) => {
            setHasDescrError(false);
            setDescription(event.target.value);
          }}
        />
      </label>

      <label>
        Movie image url:
        <input
          className={cn('form__label', { error: hasImgUrlError })}
          type="text"
          placeholder="Movie image url"
          data-cy="form-imgUrl"
          value={imgUrl}
          onChange={(event) => {
            setHasImgUrlError(false);
            setImgUrl(event.target.value);
          }}
        />
      </label>

      <label>
        Imdb url:
        <input
          className={cn('form__label', { error: hasImdbUrlError })}
          type="text"
          placeholder="imdb url"
          data-cy="form-imdbUrl"
          value={imdbUrl}
          onChange={(event) => {
            setHasImdbUrlError(false);
            setImdbUrl(event.target.value);
          }}
        />
      </label>

      <label>
        Imdb ID:
        <input
          className={cn('form__label', { error: hasImdbIdError })}
          type="text"
          placeholder="imdb ID"
          data-cy="form-imdbId"
          value={imdbId}
          onChange={(event) => {
            setHasImdbIdError(false);
            setImdbId(event.target.value);
          }}
        />
      </label>

      <button
        type="submit"
        data-cy="form-submit-button"
      >
        Submit
      </button>
    </form>
  );
};
