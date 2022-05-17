import React from 'react';
import classNames from 'classnames';

import { EmptyErrors, ValidUrlErrors } from '../../types/ErrorTypes';
import { Movie } from '../../types/Movie';

type Props = Movie & EmptyErrors & ValidUrlErrors & {
  isSubmited: boolean;
  isSubmitDisabled: boolean;
  isInputEmpty: (value: string, inputName: string) => void
  handleSubmit: (event: {
    preventDefault: () => void;
  }) => void;
  isUrlValid: (value: string, inputName: string) => void;
  changeInputValue: (value: string, inputName: string) => void;
};

export const NewMovieForm: React.FC<Props> = ({
  title,
  description,
  imgUrl,
  imdbUrl,
  imdbId,
  isTitleErrorVisible,
  isImgUrlErrorVisible,
  isImdbUrlErrorVisible,
  isImdbIdErrorVisible,
  isImdbUrlInvalid,
  isImgUrlInvalid,
  isSubmited,
  isSubmitDisabled,
  isInputEmpty,
  isUrlValid,
  handleSubmit,
  changeInputValue,
}) => (
  <form
    onSubmit={(event) => {
      handleSubmit(event);
    }}
    className="form"
  >
    <h2 className="form__title">
      Add new movie form
    </h2>

    <label className="form__label">
      Title:
      <input
        name="title"
        type="text"
        value={title}
        onChange={({ target }) => {
          changeInputValue(target.value, target.name);
        }}
        onBlur={({ target }) => {
          if (isSubmited) {
            isInputEmpty(target.value, target.name);
          }
        }}
        className={classNames(
          'form__input',
          { 'form__input--invalid': isTitleErrorVisible },
        )}
      />
    </label>

    {isTitleErrorVisible && (
      <p className="form__error">
        * Title is required
      </p>
    )}

    <label className="form__label">
      Description:
      <input
        name="description"
        type="text"
        value={description}
        onChange={({ target }) => {
          changeInputValue(target.value, target.name);
        }}
        className="form__input"
      />
    </label>

    <label className="form__label">
      Image URL:
      <input
        name="imgUrl"
        type="text"
        value={imgUrl}
        onChange={({ target }) => {
          changeInputValue(target.value, target.name);
        }}
        onBlur={({ target }) => {
          if (isSubmited) {
            isInputEmpty(target.value, target.name);
            isUrlValid(target.value, target.name);
          }
        }}
        className={classNames(
          'form__input',
          {
            'form__input--invalid': (isImgUrlErrorVisible
              || isImgUrlInvalid),
          },
        )}
      />
    </label>

    {isImgUrlErrorVisible && (
      <p className="form__error">
        * Image URL is required
      </p>
    )}

    {isImgUrlInvalid && (
      <p className="form__error">
        * Image URL is not valid
      </p>
    )}

    <label className="form__label">
      IMDB URL:
      <input
        name="imdbUrl"
        type="text"
        value={imdbUrl}
        onChange={({ target }) => {
          changeInputValue(target.value, target.name);
        }}
        onBlur={({ target }) => {
          if (isSubmited) {
            isInputEmpty(target.value, target.name);
            isUrlValid(target.value, target.name);
          }
        }}
        className={classNames(
          'form__input',
          {
            'form__input--invalid': (isImdbUrlErrorVisible
              || isImdbUrlInvalid),
          },
        )}
      />
    </label>

    {isImdbUrlErrorVisible && (
      <p className="form__error">
        * IMDB URL is required
      </p>
    )}

    {isImdbUrlInvalid && (
      <p className="form__error">
        * IMDB URL is not valid
      </p>
    )}

    <label className="form__label">
      IMDB ID:
      <input
        name="imdbId"
        type="text"
        value={imdbId}
        onChange={({ target }) => {
          changeInputValue(target.value, target.name);
        }}
        onBlur={({ target }) => {
          if (isSubmited) {
            isInputEmpty(target.value, target.name);
          }
        }}
        className={classNames(
          'form__input',
          { 'form__input--invalid': isImdbIdErrorVisible },
        )}
      />
    </label>

    {isImdbIdErrorVisible && (
      <p className="form__error">
        * IMDB ID is required
      </p>
    )}

    <button
      type="submit"
      className="form__submit"
      disabled={isSubmitDisabled}
    >
      Submit
    </button>

  </form>
);
