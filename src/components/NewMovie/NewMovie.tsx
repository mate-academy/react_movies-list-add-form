/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-console */
import React, { useState } from 'react';
import './NewMovie.scss';

interface Movie {
  title: string,
  description: string,
  imgUrl: string,
  imdbUrl: string,
  imdbId: string,
}

type Props = {
  onAdd: (movie: Movie) => void,
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');
  const [formError, setFormError] = useState(false);

  const formClear = () => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (
      title.length > 0
      && description.length > 0
      && imgUrl.length > 0
      && imdbUrl.length > 0
      && imdbId.length > 0
    ) {
      const movie: Movie = {
        title,
        description,
        imgUrl,
        imdbUrl,
        imdbId,
      };

      setFormError(false);
      onAdd(movie);
      formClear();
    } else {
      setFormError(true);
    }
  };

  return (
    <form
      className="form"
      onSubmit={handleSubmit}
    >
      <label className="form__label">
        Title:
        {' '}
        <input
          type="text"
          className="form__input"
          placeholder="Title"
          value={title}
          onChange={event => {
            return setTitle(event.target.value);
          }}
        />
      </label>
      <label className="form__label">
        Description:
        {' '}
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={event => {
            return setDescription(event.target.value);
          }}
        />
      </label>
      <label className="form__label">
        Image URL:
        {' '}
        <input
          type="text"
          placeholder="ImgUrl"
          value={imgUrl}
          onChange={event => {
            return setImgUrl(event.target.value);
          }}
        />
      </label>
      <label className="form__label">
        IMDB URL:
        {' '}
        <input
          type="text"
          placeholder="ImdbUrl"
          value={imdbUrl}
          onChange={event => {
            return setImdbUrl(event.target.value);
          }}
        />
      </label>
      <label className="form__label">
        IMDB Id:
        {' '}
        <input
          type="text"
          placeholder="ImdbId"
          value={imdbId}
          onChange={event => {
            return setImdbId(event.target.value);
          }}
        />
      </label>
      {formError
        && <p className="form__error">The form must be filled</p>}
      <button
        type="submit"
      >
        Add
      </button>
    </form>
  );
};
