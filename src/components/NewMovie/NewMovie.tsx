import classNames from 'classnames';
import React, { useState } from 'react';

import './NewMovie.scss';

type Props = {
  addMovie: (movie: Movie) => void;
};

const isInvalid = (value: string, name = '') => {
  switch (name) {
    case 'imgUrl':
    case 'imdbUrl':
      return !/^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/
        .test(name);

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

  const [wereInputsTouched, setWereInputsTouched] = useState({
    wasTitleTouched: false,
    wasDescriptionTouched: false,
    wasImgUrlTouched: false,
    wasImdbUrlTouched: false,
    wasImdbIdTouched: false,
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

    const newMovie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    addMovie(newMovie);
    clearForm();
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
        }}
        onBlur={() => {
          setInputsValidations({
            ...inputsValidations,
            isTitleInvalid: isInvalid(title),
          });

          setWereInputsTouched({
            ...wereInputsTouched,
            wasTitleTouched: true,
          });
        }}
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
        required
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
        }}
        onBlur={(event) => {
          setInputsValidations({
            ...inputsValidations,
            isImgUrlInvalid: isInvalid(imgUrl, event.target.name),
          });

          setWereInputsTouched({
            ...wereInputsTouched,
            wasImgUrlTouched: true,
          });
        }}
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
        required
      />

      <p className="error">{isImgUrlInvalid && errorMessage}</p>

      <input
        type="text"
        name="imdbUrl"
        value={imdbUrl}
        onChange={event => setImdbUrl(event.target.value)}
        onBlur={(event) => {
          setInputsValidations({
            ...inputsValidations,
            isImdbUrlInvalid: isInvalid(imdbUrl, event.target.name),
          });

          setWereInputsTouched({
            ...wereInputsTouched,
            wasImdbUrlTouched: true,
          });
        }}
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
        required
      />

      <p className="error">{isImdbUrlInvalid && errorMessage}</p>

      <input
        type="text"
        name="imdbId"
        value={imdbId}
        onChange={event => setImdbId(event.target.value)}
        onBlur={() => {
          setInputsValidations({
            ...inputsValidations,
            isImdbIdInvalid: isInvalid(imdbId),
          });

          setWereInputsTouched({
            ...wereInputsTouched,
            wasImdbIdTouched: true,
          });
        }}
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
        required
      />

      <p className="error">{isImdbIdInvalid && errorMessage}</p>

      <button
        type="submit"
      >
        Add movie
      </button>
    </form>
  );
};
