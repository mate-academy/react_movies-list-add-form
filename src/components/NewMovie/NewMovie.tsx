import React, { FC, useCallback, useState } from 'react';
import classNames from 'classnames';

export interface NewMovieProps {
  onAdd: (movie: Movie) => void,
}
export const NewMovie: FC<NewMovieProps> = React.memo(({ onAdd }) => {
  const [newMovie, setNewMovie] = useState({
    title: '',
    imdbUrl: '',
    imgUrl: '',
    imdbId: '',
    description: '',
  });

  const {
    title,
    imdbUrl,
    imgUrl,
    imdbId,
    description,
  } = newMovie;

  const [error, setError] = useState({
    titleErrorMessage: '',
    isTitleInvalid: false,
    imgUrlErrorMessage: '',
    isImgUrlInvalid: false,
    imdbIdErrorMessage: '',
    isImdbIdInvalid: false,
    imdbUrlErrorMessage: '',
    isImdbUrlInvalid: false,
  });

  const invalidUrlChars = /[^a-zA-Z0-9-._~:/?#[@!$&'()*+,;=]/g;

  const clearForm = useCallback(() => {
    setNewMovie({
      title: '',
      description: '',
      imgUrl: '',
      imdbId: '',
      imdbUrl: '',
    });
  }, []);

  const handleChange = useCallback((
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    setNewMovie(prevState => ({ ...prevState, [name]: value }));
  }, []);

  const setErrorState = useCallback((
    key1: string,
    value1: boolean,
    key2: string,
    value2: string,
  ) => {
    setError(prevState => (
      {
        ...prevState,
        [key1]: value1,
        [key2]: value2,
      }
    ));
  }, []);

  const validateForm = () => {
    if (!title) {
      setErrorState(
        'isTitleInvalid',
        true,
        'titleErrorMessage',
        'Title is required',
      );
    }

    if (!imdbId) {
      setErrorState(
        'isImdbIdInvalid',
        true,
        'imdbIdErrorMessage',
        'ImdbId is required',
      );
    }

    if (!imgUrl) {
      setErrorState(
        'isImgUrlInvalid',
        true,
        'imgUrlErrorMessage',
        'ImgUrl is required',
      );
    }

    if (!imdbUrl) {
      setErrorState(
        'isImdbUrlInvalid',
        true,
        'imdbUrlErrorMessage',
        'ImdbUrl is required',
      );
    }
  };

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formFields = [title, imdbId, imgUrl, imdbUrl];

    if (formFields.every(field => field !== '')) {
      onAdd(newMovie);
      clearForm();
    }
  };

  return (
    <form
      onSubmit={(event) => {
        validateForm();
        submitForm(event);
      }}
    >
      <div className="form">
        <div className="control form__control">
          <input
            name="title"
            value={title}
            className={classNames(
              'input', { input__error: error.isTitleInvalid },
            )}
            type="text"
            placeholder="Enter movie Title"
            data-cy="form-title"
            onChange={(event) => {
              handleChange(event);
              setErrorState(
                'isTitleInvalid',
                false,
                'titleErrorMessage',
                '',
              );
            }}
            onFocus={() => setError(prevState => (
              { ...prevState, isTitleInvalid: true }
            ))}
          />
          <p className="input__error-message">{error.titleErrorMessage}</p>
        </div>

        <div className="
          control
          form__control
        "
        >
          <textarea
            name="description"
            value={description}
            className="
              input
              form__control--description"
            placeholder="Enter movie Description"
            data-cy="form-description"
            onChange={(event) => {
              handleChange(event);
            }}
          />
        </div>

        <div className="control form__control">
          <input
            name="imgUrl"
            value={imgUrl}
            className={classNames(
              'input', { input__error: error.isImgUrlInvalid },
            )}
            placeholder="Enter movie imgUrl"
            data-cy="form-imgUrl"
            onChange={(event) => {
              event.target.value.replace(invalidUrlChars, '');
              handleChange(event);
              setErrorState(
                'isImgUrlInvalid',
                false,
                'imgUrlErrorMessage',
                '',
              );
            }}
            onFocus={() => setError(prevState => (
              { ...prevState, isImdbUrlInvalid: true }
            ))}
          />
          <p className="input__error-message">{error.imgUrlErrorMessage}</p>
        </div>

        <div className="control form__control">
          <input
            name="imdbUrl"
            value={imdbUrl}
            className={classNames(
              'input', { input__error: error.isImdbUrlInvalid },
            )}
            placeholder="Enter movie imdbUrl"
            data-cy="form-imdbUrl"
            onChange={(event) => {
              event.target.value.replace(invalidUrlChars, '');
              handleChange(event);
              setErrorState(
                'isImdbUrlInvalid',
                false,
                'imdbUrlErrorMessage',
                '',
              );
            }}
            onFocus={() => setError(prevState => (
              { ...prevState, isImdbUrlInvalid: true }
            ))}
          />
          <p className="input__error-message">{error.imdbUrlErrorMessage}</p>
        </div>

        <div className="control form__control">
          <input
            name="imdbId"
            value={imdbId}
            className={classNames(
              'input', { input__error: error.isImdbIdInvalid },
            )}
            placeholder="Enter movie imdbId"
            data-cy="form-imdbId"
            onChange={(event) => {
              handleChange(event);
              setErrorState(
                'isImdbIdInvalid',
                false,
                'imdbIdErrorMessage',
                '',
              );
            }}
            onFocus={() => setError(prevState => (
              { ...prevState, isImdbIdInvalid: true }
            ))}
          />
          <p className="input__error-message">{error.imdbIdErrorMessage}</p>
        </div>

        <div className="field is-grouped">
          <div className="control form__control">
            <button
              type="submit"
              className="button is-link"
              data-cy="form-submit-button"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </form>
  );
});
