import classNames from 'classnames';
import React, { useState } from 'react';

import './NewMovie.scss';

type Props = {
  addMovie: (movie: Movie) => void;
};

const isInvalid = (value: string, name = '') => {
  const linkSymbols = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

  switch (name) {
    case 'imgUrl':
    case 'imdbUrl':
      return !linkSymbols.test(value);

    default:
      return value === '';
  }
};

const errorMessage = 'Invalid value';

export const NewMovie: React.FC<Props> = ({ addMovie }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');
  const [inputsValidations, setInputsValidations] = useState({
    isTitleInvalid: false,
    isDescriptionInvalid: false,
    isImgUrlInvalid: false,
    isImdbUrlInvalid: false,
    isImdbIdInvalid: false,
  });

  const clearForm = () => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  const onAdd = (event: React.FormEvent) => {
    event.preventDefault();

    const areAllInputsValid = Object.values(inputsValidations).every(v => !v);

    if (areAllInputsValid) {
      const newMovie = {
        title,
        description,
        imgUrl,
        imdbUrl,
        imdbId,
      };

      addMovie(newMovie);
      clearForm();
    }
  };

  const onInputBlur = (
    isInvalidName: string,
    value: string,
    name: string,
  ) => {
    setInputsValidations({
      ...inputsValidations,
      [isInvalidName]: isInvalid(value, name),
    });
  };

  const onInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    isInvalidName: string,
    name: string,
  ) => {
    const { value } = event.target;

    setInputsValidations({
      ...inputsValidations,
      [isInvalidName]: isInvalid(value, name),
    });
  };

  const {
    isTitleInvalid,
    isImgUrlInvalid,
    isImdbUrlInvalid,
    isImdbIdInvalid,
  } = inputsValidations;

  return (
    <form
      onSubmit={onAdd}
      className="form"
    >
      <input
        type="text"
        name="title"
        value={title}
        onChange={event => {
          setTitle(event.target.value);
          onInputChange(
            event,
            'isTitleInvalid',
            'title',
          );
        }}
        onBlur={() => onInputBlur(
          'isTitleInvalid',
          title,
          'title',
        )}
        className={
          classNames(
            'form__input',
            {
              invalid: isTitleInvalid,
            },
          )
        }
        placeholder="title"
        autoComplete="off"
      />

      <p className="error">{isTitleInvalid && errorMessage}</p>

      <input
        type="text"
        name="description"
        value={description}
        className="form__input"
        onChange={event => setDescription(event.target.value)}
        placeholder="description"
        autoComplete="off"
      />

      <input
        type="text"
        name="imgUrl"
        value={imgUrl}
        onChange={event => {
          setImgUrl(event.target.value);
          onInputChange(
            event,
            'isImgUrlInvalid',
            'imgUrl',
          );
        }}
        onBlur={() => onInputBlur(
          'isImgUrlInvalid',
          imgUrl,
          'imgUrl',
        )}
        className={
          classNames(
            'form__input',
            {
              invalid: isImgUrlInvalid,
            },
          )
        }
        placeholder="img url"
        autoComplete="off"
      />

      <p className="error">{isImgUrlInvalid && errorMessage}</p>

      <input
        type="text"
        name="imdbUrl"
        value={imdbUrl}
        onChange={event => {
          setImdbUrl(event.target.value);
          onInputChange(
            event,
            'isImdbUrlInvalid',
            'imdbUrl',
          );
        }}
        onBlur={() => onInputBlur(
          'isImdbUrlInvalid',
          imdbUrl,
          'imdbUrl',
        )}
        className={
          classNames(
            'form__input',
            {
              invalid: isImdbUrlInvalid,
            },
          )
        }
        placeholder="imdb url"
        autoComplete="off"
      />

      <p className="error">{isImdbUrlInvalid && errorMessage}</p>

      <input
        type="text"
        name="imdbId"
        value={imdbId}
        onChange={event => {
          setImdbId(event.target.value);
          onInputChange(
            event,
            'isImdbIdInvalid',
            'imdbId',
          );
        }}
        onBlur={() => onInputBlur(
          'isImdbIdInvalid',
          imdbId,
          'imdbId',
        )}
        className={
          classNames(
            'form__input',
            {
              invalid: isImdbIdInvalid,
            },
          )
        }
        placeholder="imdb id"
        autoComplete="off"
      />

      <p className="error">{isImdbIdInvalid && errorMessage}</p>

      <button type="submit">
        Add movie
      </button>
    </form>
  );
};
