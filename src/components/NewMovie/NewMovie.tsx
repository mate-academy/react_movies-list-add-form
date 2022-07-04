import React, { useState } from 'react';
import cn from 'classnames';
import { Movie } from '../../react-app-env';
import './NewMovie.scss';

type Props = {
  onAdd: (movie: Movie) => void;
};

// eslint-disable-next-line max-len
const regex = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [newMovie, setNewMovie] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const [isNewMovieValid, setIsNewMovieValid] = useState({
    isTitleValid: true,
    isDescriptionValid: true,
    isImgUrlValid: true,
    isImdbUrlValid: true,
    isImdbIdValid: true,
  });

  const [isSubmitButtonValid, setIsSubmitButtonValid] = useState(true);

  const isFormValid = () => {
    const {
      isTitleValid,
      isDescriptionValid,
      isImgUrlValid,
      isImdbUrlValid,
      isImdbIdValid,
    } = isNewMovieValid;

    return (isTitleValid && isDescriptionValid && isImdbUrlValid
      && isImgUrlValid && isImdbIdValid);
  };

  const clearForm = () => {
    setNewMovie({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  const handleFormSubmission = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isFormValid()) {
      setIsSubmitButtonValid(true);

      onAdd(newMovie);

      clearForm();

      return;
    }

    if (!newMovie.title) {
      setIsNewMovieValid({
        ...isNewMovieValid,
        isTitleValid: false,
      });
    }

    if (!newMovie.description) {
      setIsNewMovieValid({
        ...isNewMovieValid,
        isDescriptionValid: false,
      });
    }

    if (!newMovie.imgUrl) {
      setIsNewMovieValid({
        ...isNewMovieValid,
        isImgUrlValid: false,
      });
    }

    if (!newMovie.imdbUrl) {
      setIsNewMovieValid({
        ...isNewMovieValid,
        isImdbUrlValid: false,
      });
    }

    if (!newMovie.imdbId) {
      setIsNewMovieValid({
        ...isNewMovieValid,
        isImdbIdValid: false,
      });
    }

    setIsSubmitButtonValid(false);
  };

  return (
    <form
      onSubmit={handleFormSubmission}
    >
      <label className="label">
        Title
        <input
          type="text"
          placeholder="Title"
          data-cy="form-title"
          className={
            cn('input', { 'is-danger': !isNewMovieValid.isTitleValid })
          }
          value={newMovie.title}
          onChange={(event => {
            setNewMovie({
              ...newMovie,
              title: event.target.value,
            });
            setIsNewMovieValid({
              ...isNewMovieValid,
              isTitleValid: true,
            });
          })}
          onBlur={() => {
            if (!newMovie.title) {
              setIsNewMovieValid({
                ...isNewMovieValid,
                isTitleValid: false,
              });
            }

            if (isFormValid()) {
              setIsSubmitButtonValid(true);
            }
          }}
        />

        {isNewMovieValid.isTitleValid
          || <span className="error-message">Title cannot be empty</span>}
      </label>

      <label className="label">
        Description
        <input
          type="text"
          placeholder="Description"
          data-cy="form-description"
          className={
            cn('input', { 'is-danger': !isNewMovieValid.isDescriptionValid })
          }
          value={newMovie.description}
          onChange={(event) => {
            setNewMovie({
              ...newMovie,
              description: event.target.value,
            });
            setIsNewMovieValid({
              ...isNewMovieValid,
              isDescriptionValid: true,
            });
          }}
          onBlur={() => {
            if (!newMovie.description) {
              setIsNewMovieValid({
                ...isNewMovieValid,
                isDescriptionValid: false,
              });
            }

            if (isFormValid()) {
              setIsSubmitButtonValid(true);
            }
          }}
        />

        {isNewMovieValid.isDescriptionValid
          || <span className="error-message">Description cannot be empty</span>}
      </label>

      <label className="label">
        Image Url
        <input
          type="text"
          placeholder="ImgUrl"
          data-cy="form-imgUrl"
          className={
            cn('input', { 'is-danger': !isNewMovieValid.isImgUrlValid })
          }
          value={newMovie.imgUrl}
          onChange={(event) => {
            setNewMovie({
              ...newMovie,
              imgUrl: event.target.value,
            });
            setIsNewMovieValid({
              ...isNewMovieValid,
              isImgUrlValid: true,
            });
          }}
          onBlur={() => {
            if (!newMovie.imgUrl || !regex.test(newMovie.imgUrl)) {
              setIsNewMovieValid({
                ...isNewMovieValid,
                isImgUrlValid: false,
              });
            }

            if (isFormValid()) {
              setIsSubmitButtonValid(true);
            }
          }}
        />

        {isNewMovieValid.isImgUrlValid
          || <span className="error-message">Invalid image Url</span>}
      </label>

      <label className="label">
        Imdb Url
        <input
          type="text"
          placeholder="ImdbUrl"
          data-cy="form-imdbUrl"
          className={
            cn('input', { 'is-danger': !isNewMovieValid.isImdbUrlValid })
          }
          value={newMovie.imdbUrl}
          onChange={(event) => {
            setNewMovie({
              ...newMovie,
              imdbUrl: event.target.value,
            });
            setIsNewMovieValid({
              ...isNewMovieValid,
              isImdbUrlValid: true,
            });
          }}
          onBlur={() => {
            if (!newMovie.imdbUrl || !regex.test(newMovie.imdbUrl)) {
              setIsNewMovieValid({
                ...isNewMovieValid,
                isImdbUrlValid: false,
              });
            }

            if (isFormValid()) {
              setIsSubmitButtonValid(true);
            }
          }}
        />

        {isNewMovieValid.isImdbUrlValid
          || <span className="error-message">Invalid imdb Url</span>}
      </label>

      <label className="label">
        ImdbId
        <input
          type="text"
          placeholder="ImdbId"
          data-cy="form-imdbId"
          className={
            isNewMovieValid.isImdbIdValid
              ? 'input'
              : 'input is-danger'
          }
          value={newMovie.imdbId}
          onChange={(event) => {
            setNewMovie({
              ...newMovie,
              imdbId: event.target.value,
            });
            setIsNewMovieValid({
              ...isNewMovieValid,
              isImdbIdValid: true,
            });
          }}
          onBlur={() => {
            if (!newMovie.imdbId) {
              setIsNewMovieValid({
                ...isNewMovieValid,
                isImdbIdValid: false,
              });
            }

            if (isFormValid()) {
              setIsSubmitButtonValid(true);
            }
          }}
        />

        {isNewMovieValid.isImdbIdValid
          || <span className="error-message">ImdbId cannot be empty</span>}
      </label>

      {isSubmitButtonValid
        ? (
          <button
            className="button"
            type="submit"
          >
            Submit
          </button>
        )
        : (
          <button
            className="button"
            type="submit"
            disabled
          >
            Submit
          </button>
        )}
    </form>
  );
};
