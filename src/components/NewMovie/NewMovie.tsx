import { useCallback, useState } from 'react';
import cn from 'classnames';
import './NewMovie.scss';

interface Props {
  onAdd: (movie: Movie) => void;
}

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [newMovie, setNewMovie] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const [movieErrors, setMovieErrors] = useState({
    hasTitleError: false,
    hasDescriptionError: false,
    hasImgUrlError: false,
    hasImdbUrlError: false,
    hasImdbIdError: false,
  });

  const {
    title,
    description,
    imgUrl,
    imdbUrl,
    imdbId,
  } = newMovie;

  const {
    hasTitleError,
    hasDescriptionError,
    hasImgUrlError,
    hasImdbUrlError,
    hasImdbIdError,
  } = movieErrors;

  const validateInput = useCallback(
    () => {
      if (!title) {
        setMovieErrors((errors) => ({
          ...errors,
          hasTitleError: true,
        }));
      }

      if (!description) {
        setMovieErrors((errors) => ({
          ...errors,
          hasDescriptionError: true,
        }));
      }

      if (!imgUrl) {
        setMovieErrors((errors) => ({
          ...errors,
          hasImgUrlError: true,
        }));
      }

      if (!imdbUrl) {
        setMovieErrors((errors) => ({
          ...errors,
          hasImdbUrlError: true,
        }));
      }

      if (!imdbId) {
        setMovieErrors((errors) => ({
          ...errors,
          hasImdbIdError: true,
        }));
      }
    },
    [title, description, imgUrl, imdbUrl, imdbId],
  );

  const clearForm = () => {
    setNewMovie({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  // eslint-disable-next-line max-len
  const regex = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

  const submitValidForm = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      validateInput();

      const formFields = [title, description, imgUrl, imdbUrl, imdbId];

      if (formFields.every(Boolean)) {
        onAdd(newMovie);
        clearForm();
      }
    },
    [newMovie],
  );

  return (
    <form
      className="form"
      onSubmit={submitValidForm}
    >
      <input
        type="text"
        placeholder="Enter movie title"
        className={cn('input', { error: hasTitleError })}
        value={newMovie.title}
        data-cy="form-title"
        onChange={(event) => {
          setNewMovie({
            ...newMovie,
            title: event.target.value,
          });
          setMovieErrors({
            ...movieErrors,
            hasTitleError: false,
          });
        }}
      />

      <textarea
        name="description"
        id=""
        placeholder="Enter description"
        className={cn('textarea', 'my-3', { error: hasDescriptionError })}
        value={description}
        data-cy="form-description"
        onChange={(event) => {
          setNewMovie({
            ...newMovie,
            description: event.target.value,
          });
          setMovieErrors({
            ...movieErrors,
            hasDescriptionError: false,
          });
        }}
      />

      <input
        type="text"
        placeholder="Enter image URL"
        className={cn('input', 'my-3', { error: hasImgUrlError })}
        value={imgUrl}
        data-cy="form-imgUrl"
        onChange={(event) => {
          setNewMovie({
            ...newMovie,
            imgUrl: event.target.value,
          });
          if (!regex.test(imgUrl)) {
            setMovieErrors({
              ...movieErrors,
              hasImgUrlError: false,
            });
          }
        }}
      />

      <input
        type="text"
        placeholder="Enter Imdb URL"
        className={cn('input', 'my-3', { error: hasImdbUrlError })}
        value={imdbUrl}
        data-cy="form-imdbUrl"
        onChange={(event) => {
          setNewMovie({
            ...newMovie,
            imdbUrl: event.target.value,
          });
          if (!regex.test(imdbUrl)) {
            setMovieErrors({
              ...movieErrors,
              hasImdbUrlError: false,
            });
          }
        }}
      />

      <input
        type="text"
        placeholder="Enter Imdb ID"
        className={cn('input', 'my-3', { error: hasImdbIdError })}
        value={imdbId}
        data-cy="form-imdbId"
        onChange={(event) => {
          setNewMovie({
            ...newMovie,
            imdbId: event.target.value,
          });
          setMovieErrors({
            ...movieErrors,
            hasImdbIdError: false,
          });
        }}
      />

      <button
        type="submit"
        className="button is-success my-3"
        data-cy="form-submit-button"
      >
        Submit
      </button>
    </form>
  );
};
