import React, { useState } from 'react';
import './NewMovie.scss';

type Props = {
  onAdd: (movie: Movie) => void,
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setTitle(value);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value } = event.target;

    setDescription(value);
  };

  const handleImgUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setImgUrl(value);
  };

  const handleImdbUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setImdbUrl(value);
  };

  const handleImdbIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setImdbId(value);
  };

  const handleNewMovieSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newMovie: Movie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    onAdd(newMovie);
    setTitle('');
    setDescription('');
    setImdbId('');
    setImdbUrl('');
    setImgUrl('');
  };

  return (
    <form
      className="NewMovie"
      onSubmit={handleNewMovieSubmit}
    >
      <input
        type="text"
        data-cy="form-title"
        placeholder="Title"
        className="NewMovie__input"
        name="title"
        value={title}
        onChange={handleTitleChange}
      />

      <input
        type="text"
        data-cy="form-description"
        placeholder="Description"
        className="NewMovie__input"
        name="description"
        value={description}
        onChange={handleDescriptionChange}
      />
      <input
        type="url"
        data-cy="form-imgUrl"
        placeholder="ImgUrl"
        className="NewMovie__input"
        name="imgUrl"
        value={imgUrl}
        onChange={handleImgUrlChange}
      />
      <input
        type="url"
        data-cy="form-imdbUrl"
        placeholder="ImdbUrl"
        className="NewMovie__input"
        name="imdbUrl"
        value={imdbUrl}
        onChange={handleImdbUrlChange}

      />
      <input
        type="text"
        data-cy="form-imdbId"
        placeholder="ImdbId"
        className="NewMovie__input"
        name="imdbId"
        value={imdbId}
        onChange={handleImdbIdChange}
      />

      <button
        type="submit"
        data-cy="form-submit-button"
        className="NewMovie__button"
      >
        OnAdd
      </button>
    </form>
  );
};
