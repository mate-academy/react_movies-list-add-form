/* eslint-disable max-len */
/* eslint-disable no-useless-escape */
/* eslint-disable @typescript-eslint/quotes */
import React, { useState } from 'react';

type Props = {
  onAdd: (title: string, description: string, imgUrl: string, imdbUrl: string,
    imdbId: string)
  => void;
};

export const NewMovie: React.FC <Props> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');
  const [titleIsReq, setTitleIsReq] = useState('');
  const [imdbIdIsReq, setImdbIdIsReq] = useState('');
  const [imdbUrlIsReq, setImdbUrlIsReq] = useState('');
  const [imgUrlIsReq, setImgUrlIsReq] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const validateUrl = (url: string) => {
    const urlregex = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

    return urlregex.test(url);
  };

  const checkInput = (input: string) => {
    if (input) {
      if (input === imdbUrl || input === imgUrl) {
        if (validateUrl(input)) {
          return '';
        }

        return 'The wrong URL';
      }

      return '';
    }

    return `${input} is required!!!`;
  };

  const handleSubmit = () => {
    if (title && imdbId && imdbUrl && imgUrl && validateUrl(imdbUrl) && validateUrl(imgUrl)) {
      onAdd(title, description, imgUrl, imdbUrl, imdbId);
      setTitle('');
      setDescription('');
      setImdbId('');
      setImdbUrl('');
      setImgUrl('');
    }

    setButtonDisabled(true);
    setTitleIsReq(checkInput(title));
    setImdbIdIsReq(checkInput(imdbId));
    setImdbUrlIsReq(checkInput(imdbUrl));
    setImgUrlIsReq(checkInput(imgUrl));
  };

  return (
    <form
      className="form"
      onSubmit={(event) => {
        event.preventDefault();
        handleSubmit();
      }}
    >
      <input
        type="text"
        className={titleIsReq
          ? 'form__input form__input--error' : 'form__input'}
        name="title"
        placeholder="title"
        value={title}
        onChange={(event) => {
          setTitle(event.target.value);
          setTitleIsReq('');
          if (title && imdbId && imdbUrl && imgUrl) {
            setButtonDisabled(false);
          }
        }}
      />

      <span
        className="form__error"
      >
        {titleIsReq}
      </span>

      <input
        type="text"
        className="form__input"
        name="description"
        placeholder="description"
        value={description}
        onChange={(event) => {
          setDescription(event.target.value);
        }}
      />

      <span
        className="form__error"
      />

      <input
        type="text"
        className={imgUrlIsReq
          ? 'form__input form__input--error' : 'form__input'}
        name="imgUrl"
        placeholder="imgUrl"
        value={imgUrl}
        onChange={(event) => {
          setImgUrl(event.target.value);
          setImgUrlIsReq('');
          if (title && imdbId && imdbUrl && imgUrl) {
            setButtonDisabled(false);
          }
        }}
      />

      <span
        className="form__error"
      >
        {imgUrlIsReq}
      </span>

      <input
        type="text"
        className={imdbUrlIsReq
          ? 'form__input form__input--error' : 'form__input'}
        name="imdbUrl"
        placeholder="imdbUrl"
        value={imdbUrl}
        onChange={(event) => {
          setImdbUrl(event.target.value);
          setImdbUrlIsReq('');
          if (title && imdbId && imdbUrl && imgUrl) {
            setButtonDisabled(false);
          }
        }}
      />

      <span
        className="form__error"
      >
        {imdbUrlIsReq}
      </span>

      <input
        type="text"
        className={imdbIdIsReq
          ? 'form__input form__input--error' : 'form__input'}
        name="imdbUrl"
        placeholder="imdbId"
        value={imdbId}
        onChange={(event) => {
          setImdbId(event.target.value);
          setImdbIdIsReq('');
          if (title && imdbId && imdbUrl && imgUrl) {
            setButtonDisabled(false);
          }
        }}
      />

      <span
        className="form__error"
      >
        {imdbIdIsReq}
      </span>

      <button
        type="submit"
        disabled={buttonDisabled}
      >
        Add movie
      </button>
    </form>
  );
};
