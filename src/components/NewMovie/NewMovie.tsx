import React, { FormEvent, useCallback, useState } from 'react';
import classNames from 'classnames';
import { FormInput } from '../FormInput';
import './NewMovie.scss';

type Props = {
  addMovie: (movie:Movie) => void,
};

export const NewMovie: React.FC<Props> = ({ addMovie }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const [titleError, setTitleError] = useState(false);
  const [imdbUrlError, setImdbUrlError] = useState(false);
  const [imdbIdError, setImdbIdError] = useState(false);
  const [imgUrlValidationError, setImgUrlValidationError] = useState(false);
  const [imdbUrllValidationError, setImdbUrlValidationError] = useState(false);

  const reset = useCallback(() => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  }, []);

  const urlPatternValidation = (el: string) => {
    const regex
    = new RegExp('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?');

    return regex.test(el);
  };

  const shouldFormSubmit = [title, imdbUrl, imdbId]
    .filter(field => field).length === 3;

  const formHasAnError = imgUrlValidationError === true
    || imdbUrllValidationError === true;

  const isVisibleErrors = () => {
    setTitleError(!title);
    setImdbUrlError(!imdbUrl);
    setImdbIdError(!imdbId);
    if (imgUrl) {
      setImgUrlValidationError(!urlPatternValidation(imgUrl));
    }

    setImdbUrlValidationError(!urlPatternValidation(imdbUrl));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    isVisibleErrors();

    if (!shouldFormSubmit || formHasAnError) {
      return;
    }

    const newMovie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    addMovie(newMovie);
    reset();
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
      <FormInput
        value={title}
        placeholder="Enter a title"
        isChange={setTitle}
        error={titleError}
        isError={setTitleError}
      />
      <FormInput
        value={description}
        placeholder="Enter a description"
        isChange={setDescription}
      />
      <FormInput
        value={imgUrl}
        placeholder="Enter a imgUrl"
        isChange={setImgUrl}
        validationError={imgUrlValidationError}
      />
      <FormInput
        value={imdbUrl}
        placeholder="Enter a imdbUrl"
        isChange={setImdbUrl}
        error={imdbUrlError}
        isError={setImdbUrlError}
        validationError={imdbUrllValidationError}
      />
      <FormInput
        value={imdbId}
        placeholder="Enter a imdbId"
        isChange={setImdbId}
        error={imdbIdError}
        isError={setImdbIdError}
      />
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
