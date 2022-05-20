import React, { useState } from 'react';
import './NewMovie.scss';

type Props = {
  addMovie: (movie: Movie) => void,
};

export const NewMovie: React.FC<Props> = ({ addMovie }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');
  const [isErrorTitle, setIsErrorTitle] = useState<string | null>(null);
  const [
    isErrorDescription, setIsErrorDescription,
  ] = useState<string | null>(null);
  const [isErrorImgUrl, setIsErrorImgUrl] = useState<string | null>(null);
  const [isErrorImdbUrl, setIsErrorImdbUrl] = useState<string | null>(null);
  const [isErrorImdbId, setIsErrorImdbId] = useState<string | null>(null);

  const validateMessage = () => {
    if (!title.trim()) {
      setIsErrorTitle('Please enter the title!');
    }

    if (!description.trim()) {
      setIsErrorDescription('Please enter the description!');
    }

    if (!imgUrl) {
      setIsErrorImgUrl('Please enter imgUrl!');
    }

    if (!imdbUrl) {
      setIsErrorImdbUrl('Please enter imdbUrl!');
    }

    if (!imdbId) {
      setIsErrorImdbId('Please enter imdbId!');
    }

    if (!title.trim() || !description.trim()
      || !imgUrl || !imdbUrl || !imdbId) {
      return false;
    }

    return true;
  };

  const onSubmitted = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (validateMessage()) {
      const addedMovie = {
        title,
        description,
        imgUrl,
        imdbUrl,
        imdbId,
      };

      addMovie(addedMovie);
      setTitle('');
      setDescription('');
      setImgUrl('');
      setImdbUrl('');
      setImdbId('');

      window.scrollTo(0, document.documentElement.clientHeight);
    }
  };

  return (
    <form
      onSubmit={onSubmitted}
      name="addMovie"
    >
      <h2 className="form__title">Add new movie</h2>
      <label>
        {isErrorTitle
          && <div className="form__error">{isErrorTitle}</div>}
        <input
          type="text"
          name="title"
          placeholder="Movie title"
          pattern="^[a-zA-Z]+$"
          minLength={3}
          className="form__input"
          value={title}
          onChange={event => {
            setTitle(event.target.value);
            setIsErrorTitle(null);
          }}
        />
      </label>
      <label>
        {isErrorDescription
            && <div className="form__error">{isErrorDescription}</div>}
        <textarea
          name="description"
          placeholder="Description"
          className="form__input"
          value={description}
          onChange={event => {
            setDescription(event.target.value);
            setIsErrorDescription(null);
          }}
        />
      </label>
      <label>
        {isErrorImgUrl
            && <div className="form__error">{isErrorImgUrl}</div>}
        <input
          type="url"
          name="imgUrl"
          placeholder="ImgUrl"
          className="form__input"
          value={imgUrl}
          onChange={event => {
            setImgUrl(event.target.value);
            setIsErrorImgUrl(null);
          }}
        />
      </label>
      <label>
        {isErrorImdbUrl
            && <div className="form__error">{isErrorImdbUrl}</div>}
        <input
          type="url"
          placeholder="ImdbUrl"
          className="form__input"
          value={imdbUrl}
          onChange={event => {
            setImdbUrl(event.target.value);
            setIsErrorImdbUrl(null);
          }}
        />
      </label>
      <label>
        {isErrorImdbId
            && <div className="form__error">{isErrorImdbId}</div>}
        <input
          type="text"
          placeholder="ImdbId"
          className="form__input form__input-lst-chld"
          value={imdbId}
          onChange={event => {
            setImdbId(event.target.value);
            setIsErrorImdbId(null);
          }}
        />
      </label>

      <button
        type="submit"
        className="form__button"
      >
        Add movie
      </button>
    </form>
  );
};
