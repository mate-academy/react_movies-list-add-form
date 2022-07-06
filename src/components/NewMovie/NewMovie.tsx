import React, { FC, useState } from 'react';
import cn from 'classnames';
import './NewMovie.scss';

type Props = {
  addMovie: (movie: Movie) => void;
};

export const NewMovie: FC<Props> = ({ addMovie }) => {
  const [newMovie, setNewMovie] = useState<Movie>({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const [errors, setErrors] = useState({
    hasTitleError: false,
    hasDescrError: false,
    hasImgUrlError: false,
    hasImdbUrlError: false,
    hasImdbIdError: false,
  });

  const validateInput = () => {
    if (!newMovie.title) {
      setErrors(() => ({ ...errors, hasTitleError: true }));
    }

    if (!newMovie.description) {
      setErrors(() => ({ ...errors, hasDescrError: true }));
    }

    if (!newMovie.imgUrl) {
      setErrors(() => ({ ...errors, hasImgUrlError: true }));
    }

    if (!newMovie.imdbUrl) {
      setErrors(() => ({ ...errors, hasImdbUrlError: true }));
    }

    if (!newMovie.imdbId) {
      setErrors(() => ({ ...errors, hasImdbIdError: true }));
    }
  };

  const submitValidForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    validateInput();

    const formFields = [
      newMovie.title,
      newMovie.description,
      newMovie.imgUrl,
      newMovie.imdbUrl,
      newMovie.imdbId,
    ];

    if (formFields.every(el => el !== '')) {
      const movie = {
        title: newMovie.title,
        description: newMovie.description,
        imgUrl: newMovie.imgUrl,
        imdbUrl: newMovie.imdbUrl,
        imdbId: newMovie.imdbId,
      };

      addMovie(movie);
      setNewMovie({
        title: '',
        description: '',
        imgUrl: '',
        imdbUrl: '',
        imdbId: '',
      });
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
          className={cn('form__label', { error: errors.hasTitleError })}
          type="text"
          placeholder="Movie title"
          data-cy="form-title"
          value={newMovie.title}
          onChange={(event) => {
            setErrors(() => ({ ...errors, hasTitleError: false }));
            setNewMovie({ ...newMovie, title: event.target.value });
          }}
        />
      </label>

      <label>
        Movie description:
        <textarea
          className={cn('form__label', { error: errors.hasDescrError })}
          placeholder="Movie description"
          data-cy="form-description"
          rows={3}
          cols={30}
          value={newMovie.description}
          onChange={(event) => {
            setErrors(() => ({ ...errors, hasDescrError: false }));
            setNewMovie({ ...newMovie, description: event.target.value });
          }}
        />
      </label>

      <label>
        Movie image url:
        <input
          className={cn('form__label', { error: errors.hasImgUrlError })}
          type="text"
          placeholder="Movie image url"
          data-cy="form-imgUrl"
          value={newMovie.imgUrl}
          onChange={(event) => {
            setErrors(() => ({ ...errors, hasImgUrlError: false }));
            setNewMovie({ ...newMovie, imgUrl: event.target.value });
          }}
        />
      </label>

      <label>
        Imdb url:
        <input
          className={cn('form__label', { error: errors.hasImdbUrlError })}
          type="text"
          placeholder="imdb url"
          data-cy="form-imdbUrl"
          value={newMovie.imdbUrl}
          onChange={(event) => {
            setErrors(() => ({ ...errors, hasImdbUrlError: false }));
            setNewMovie({ ...newMovie, imdbUrl: event.target.value });
          }}
        />
      </label>

      <label>
        Imdb ID:
        <input
          className={cn('form__label', { error: errors.hasImdbIdError })}
          type="text"
          placeholder="imdb ID"
          data-cy="form-imdbId"
          value={newMovie.imdbId}
          onChange={(event) => {
            setErrors(() => ({ ...errors, hasImdbIdError: false }));
            setNewMovie({ ...newMovie, imdbId: event.target.value });
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
