import React, { useCallback, useState } from 'react';
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

  const [newMovieValidation, setNewMovieValidation] = useState({
    isTitleValid: true,
    isDescriptionValid: true,
    isImgUrlValid: true,
    isImdbUrlValid: true,
    isImdbIdValid: true,
  });

  const [isSubmitButtonValid, setIsSubmitButtonValid] = useState(true);

  const isFormValid = useCallback(
    () => {
      const {
        isTitleValid,
        isDescriptionValid,
        isImgUrlValid,
        isImdbUrlValid,
        isImdbIdValid,
      } = newMovieValidation;

      return isTitleValid
        && isDescriptionValid
        && isImdbUrlValid
        && isImgUrlValid
        && isImdbIdValid;
    },
    [
      newMovieValidation.isTitleValid,
      newMovieValidation.isDescriptionValid,
      newMovieValidation.isImgUrlValid,
      newMovieValidation.isImdbUrlValid,
      newMovieValidation.isImdbIdValid,
    ],
  );

  const clearForm = useCallback(
    () => {
      setNewMovie({
        title: '',
        description: '',
        imgUrl: '',
        imdbUrl: '',
        imdbId: '',
      });
    },
    [
      newMovie.title,
      newMovie.description,
      newMovie.imdbUrl,
      newMovie.imdbUrl,
      newMovie.imdbId,
    ],
  );

  const handleFormSubmission = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isFormValid()) {
      setIsSubmitButtonValid(true);

      onAdd(newMovie);

      clearForm();

      return;
    }

    if (!newMovie.title) {
      setNewMovieValidation(prevNewMovieValidation => ({
        ...prevNewMovieValidation,
        isTitleValid: false,
      }));
    }

    if (!newMovie.description) {
      setNewMovieValidation(prevNewMovieValidation => ({
        ...prevNewMovieValidation,
        isDescriptionValid: false,
      }));
    }

    if (!newMovie.imgUrl) {
      setNewMovieValidation(prevNewMovieValidation => ({
        ...prevNewMovieValidation,
        isImgUrlValid: false,
      }));
    }

    if (!newMovie.imdbUrl) {
      setNewMovieValidation(prevNewMovieValidation => ({
        ...prevNewMovieValidation,
        isImdbUrlValid: false,
      }));
    }

    if (!newMovie.imdbId) {
      setNewMovieValidation(prevNewMovieValidation => ({
        ...prevNewMovieValidation,
        isImdbIdValid: false,
      }));
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
          required
          placeholder="Title"
          data-cy="form-title"
          className={
            cn('input', { 'is-danger': !newMovieValidation.isTitleValid })
          }
          value={newMovie.title}
          onChange={(event => {
            setNewMovie({
              ...newMovie,
              title: event.target.value,
            });
            setNewMovieValidation(prevNewMovieValidation => ({
              ...prevNewMovieValidation,
              isTitleValid: true,
            }));
          })}
          onBlur={() => {
            if (!newMovie.title) {
              setNewMovieValidation(prevNewMovieValidation => ({
                ...prevNewMovieValidation,
                isTitleValid: false,
              }));
            }

            if (isFormValid()) {
              setIsSubmitButtonValid(true);
            }
          }}
        />

        {newMovieValidation.isTitleValid
          || <span className="error-message">Title cannot be empty</span>}
      </label>

      <label className="label">
        Description
        <input
          type="text"
          placeholder="Description"
          data-cy="form-description"
          className={
            cn('input', { 'is-danger': !newMovieValidation.isDescriptionValid })
          }
          value={newMovie.description}
          onChange={(event) => {
            setNewMovie({
              ...newMovie,
              description: event.target.value,
            });
            setNewMovieValidation(prevNewMovieValidation => ({
              ...prevNewMovieValidation,
              isDescriptionValid: true,
            }));
          }}
          onBlur={() => {
            if (!newMovie.description) {
              setNewMovieValidation(prevNewMovieValidation => ({
                ...prevNewMovieValidation,
                isDescriptionValid: false,
              }));
            }

            if (isFormValid()) {
              setIsSubmitButtonValid(true);
            }
          }}
        />

        {newMovieValidation.isDescriptionValid
          || <span className="error-message">Description cannot be empty</span>}
      </label>

      <label className="label">
        Image Url
        <input
          type="text"
          placeholder="ImgUrl"
          data-cy="form-imgUrl"
          required
          className={
            cn('input', { 'is-danger': !newMovieValidation.isImgUrlValid })
          }
          value={newMovie.imgUrl}
          onChange={(event) => {
            setNewMovie({
              ...newMovie,
              imgUrl: event.target.value,
            });
            setNewMovieValidation(prevNewMovieValidation => ({
              ...prevNewMovieValidation,
              isImgUrlValid: true,
            }));
          }}
          onBlur={() => {
            if (!newMovie.imgUrl || !regex.test(newMovie.imgUrl)) {
              setNewMovieValidation(prevNewMovieValidation => ({
                ...prevNewMovieValidation,
                isImgUrlValid: false,
              }));
            }

            if (isFormValid()) {
              setIsSubmitButtonValid(true);
            }
          }}
        />

        {newMovieValidation.isImgUrlValid
          || <span className="error-message">Invalid image Url</span>}
      </label>

      <label className="label">
        Imdb Url
        <input
          type="text"
          placeholder="ImdbUrl"
          data-cy="form-imdbUrl"
          required
          className={
            cn('input', { 'is-danger': !newMovieValidation.isImdbUrlValid })
          }
          value={newMovie.imdbUrl}
          onChange={(event) => {
            setNewMovie({
              ...newMovie,
              imdbUrl: event.target.value,
            });
            setNewMovieValidation(prevNewMovieValidation => ({
              ...prevNewMovieValidation,
              isImdbUrlValid: true,
            }));
          }}
          onBlur={() => {
            if (!newMovie.imdbUrl || !regex.test(newMovie.imdbUrl)) {
              setNewMovieValidation(prevNewMovieValidation => ({
                ...prevNewMovieValidation,
                isImdbUrlValid: false,
              }));
            }

            if (isFormValid()) {
              setIsSubmitButtonValid(true);
            }
          }}
        />

        {newMovieValidation.isImdbUrlValid
          || <span className="error-message">Invalid imdb Url</span>}
      </label>

      <label className="label">
        ImdbId
        <input
          type="text"
          placeholder="ImdbId"
          data-cy="form-imdbId"
          required
          className={
            newMovieValidation.isImdbIdValid
              ? 'input'
              : 'input is-danger'
          }
          value={newMovie.imdbId}
          onChange={(event) => {
            setNewMovie({
              ...newMovie,
              imdbId: event.target.value,
            });
            setNewMovieValidation(prevNewMovieValidation => ({
              ...prevNewMovieValidation,
              isImdbIdValid: true,
            }));
          }}
          onBlur={() => {
            if (!newMovie.imdbId) {
              setNewMovieValidation(prevNewMovieValidation => ({
                ...prevNewMovieValidation,
                isImdbIdValid: false,
              }));
            }

            if (isFormValid()) {
              setIsSubmitButtonValid(true);
            }
          }}
        />

        {newMovieValidation.isImdbIdValid
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
