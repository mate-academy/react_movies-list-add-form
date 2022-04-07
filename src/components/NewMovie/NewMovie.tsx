import React, { useState } from 'react';

import './NewMovie.scss';

interface Props {
  onAdd: (movie: Movie) => void,
}

export const NewMovie: React.FC<Props> = React.memo(({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const inputHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.id) {
      case 'title':
        setTitle(e.target.value);
        break;

      case 'description':
        setDescription(e.target.value);
        break;

      case 'imgUrl':
        setImgUrl(e.target.value);
        break;

      case 'imdbUrl':
        setImdbUrl(e.target.value);
        break;

      case 'imdbId':
        setImdbId(e.target.value);
        break;

      default:
        return 0;
    }

    return 0;
  };

  const clearInputs = () => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  const createMovie = () => {
    onAdd({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });
  };

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createMovie();
    clearInputs();
  };

  return (
    <form
      className="form"
      onSubmit={submitHandler}
    >
      <label
        htmlFor="title"
        className="label"
      >
        Title
        <input
          type="text"
          id="title"
          onChange={inputHandler}
          value={title}
        />
      </label>
      <label
        htmlFor="description"
        className="label"
      >
        Description
        <input
          type="text"
          id="description"
          onChange={inputHandler}
          value={description}
        />
      </label>
      <label
        htmlFor="imgUrl"
        className="label"
      >
        imgUrl
        <input
          type="text"
          id="imgUrl"
          onChange={inputHandler}
          value={imgUrl}
        />
      </label>
      <label
        htmlFor="imdbUrl"
        className="label"
      >
        imdbUrl
        <input
          type="text"
          id="imdbUrl"
          onChange={inputHandler}
          value={imdbUrl}
        />
      </label>
      <label
        htmlFor="imdbId"
        className="label"
      >
        imdbId
        <input
          type="text"
          id="imdbId"
          onChange={inputHandler}
          value={imdbId}
        />
      </label>
      <button type="submit" className="button">
        Add movie
      </button>
    </form>
  );
});
