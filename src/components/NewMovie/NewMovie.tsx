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

  const checkInput = (input: string) => {
    if (input) {
      return '';
    }

    return `${input} is required!!!`;
  };

  const handleSubmit = () => {
    if (title && imdbId && imdbUrl && imgUrl) {
      onAdd(title, description, imgUrl, imdbUrl, imdbId);
      setTitle('');
      setDescription('');
      setImdbId('');
      setImdbUrl('');
      setImgUrl('');
    }

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
        placeholder="imdbUrl"
        value={imdbId}
        onChange={(event) => {
          setImdbId(event.target.value);
          setImdbIdIsReq('');
        }}
      />

      <span
        className="form__error"
      >
        {imdbIdIsReq}
      </span>

      <button
        type="submit"
      >
        Add movie
      </button>
    </form>
  );
};
