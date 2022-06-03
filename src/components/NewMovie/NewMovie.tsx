import React, { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import classNames from 'classnames';
import './NewMovie.scss';

type Props = {
  addMovie: (movie:Movie) => void,
};

export const NewMovie: React.FC<Props> = ({ addMovie }) => {
  const initialMovie = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  const initialError = {
    title: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  const [movie, setMovie] = useState(initialMovie);
  const [errors, setErrors] = useState(initialError);

  // eslint-disable-next-line max-len
  const patternURL = new RegExp('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?');

  const titleValidation = () => {
    let errorType = '';

    if (!movie.title.trim()) {
      errorType = 'Title is required!';
    }

    setErrors({
      ...errors,
      title: errorType,
    });

    return errorType;
  }

  const imgUrlValidation = () => {
    let errorType = '';

    if (!movie.imgUrl.trim()) {
      errorType = 'imdbUrl if required!'
    } else if (!patternURL.test(movie.imgUrl)) {
      errorType = 'Please enter a valid URL!';
    }

    setErrors({
      ...errors,
      imgUrl: errorType,
    })

    return errorType;
  }

  const imdbUrlValidation = () => {
    let errorType = '';

    if (!movie.imdbUrl.trim()) {
      errorType = 'imdbUrl if required!'
    } else if (!patternURL.test(movie.imdbUrl)) {
      errorType = 'Please enter a valid URL!';
    }

    setErrors({
      ...errors,
      imdbUrl: errorType,
    })

    return errorType;
  }

  const imdbIdValidation = () => {
    let errorType = '';

    if (!movie.imdbId.trim()) {
      errorType = 'Title is required!';
    }

    setErrors({
      ...errors,
      imdbId: errorType,
    });

    return errorType;
  }

  const hasAnError = () => {
    const currentErrors = {...errors};

    currentErrors.title = titleValidation();
    currentErrors.imgUrl = imgUrlValidation();
    currentErrors.imdbId = imdbIdValidation();
    currentErrors.imdbUrl = imdbUrlValidation();
    
    return currentErrors;
  }

  const reset = useCallback(() => {
    setMovie(initialMovie)
    setErrors(initialError)
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setMovie({...movie, [name]: value});
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const currentErrors = hasAnError();
    const canSubmit = Object.values(currentErrors).every(el => !el);

    setErrors(currentErrors)

    if (canSubmit) {
      addMovie(movie)
      reset()
    }
  };

  return (
    <form
      className="movie-form"
      onSubmit={handleSubmit}
    >
      <h2
        className="movie-form__title"
      >
        Add new movie
      </h2>
        <label className="movie-form__label">
          <input
            className='movie-form__input'
            name="title"
            type="text"
            placeholder="Enter a title"
            value={movie.title}
            onChange={handleChange}
            onBlur={titleValidation}
          />
        </label>
        {errors.title && (
          <p className="movie-form__error">
            {errors.title}
          </p>
        )}

        <label className="movie-form__label">
            <input
              className='movie-form__input'
              placeholder="Enter a description"
              name="description"
              type="text"
              value={movie.description}
              onChange={handleChange}
            />
        </label>

        <label className="movie-form__label">
          <input
            className='movie-form__input'
            name="imgUrl"
            type="text"
            value={movie.imgUrl}
            onChange={handleChange}
            onBlur={imgUrlValidation}
            placeholder="Enter a image URL"
          />
        </label>
        {errors.imgUrl && (
          <p className="movie-form__error">
            {errors.imgUrl}
          </p>
        )}

        <label className="movie-form__label">
          <input
            className='movie-form__input'
            name="imdbUrl"
            type="text"
            value={movie.imdbUrl}
            onChange={handleChange}
            onBlur={imdbUrlValidation}
            placeholder="Enter a imdb URL"
          />
        </label>
        {errors.imdbUrl && (
          <p className="movie-form__error">
            {errors.imdbUrl}
          </p>
        )}

        <label className="movie-form__label">
          <input
            className='movie-form__input'
            name="imdbId"
            type="text"
            value={movie.imdbId}
            onChange={handleChange}
            onBlur={imdbIdValidation}
            placeholder="Enter a imdb Id"
          />
        </label>
        {errors.imdbId && (
          <p className="movie-form__error">
            {errors.imdbId}
          </p>
        )}
      <button
        type="submit"
        className={classNames(
          'movie-form__submit-btn',
        )}
      >
        Add new movie
      </button>
    </form>
  );
};
