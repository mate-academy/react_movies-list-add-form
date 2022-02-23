import React, { useState } from 'react';
import './NewMovie.scss';

type Props = {
  addMovies: (movie: Movie) => void
};

export const NewMovie:React.FC<Props> = ({ addMovies }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const clearInputs = () => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  const addNewMovie = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newMovie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    clearInputs();
    addMovies(newMovie);
  };

  return (
    <form className="form" onSubmit={addNewMovie}>
      <input
        className="form__input"
        type="text"
        placeholder="title"
        value={title}
        onChange={event => setTitle(event.target.value)}
      />
      <input
        className="form__input"
        type="text"
        placeholder="description"
        value={description}
        onChange={event => setDescription(event.target.value)}
      />
      <input
        className="form__input"
        type="text"
        placeholder="imgUrl"
        value={imgUrl}
        onChange={event => setImgUrl(event.target.value)}
      />
      <input
        className="form__input"
        type="text"
        placeholder="imdbUrl"
        value={imdbUrl}
        onChange={event => setImdbUrl(event.target.value)}
      />
      <input
        className="form__input"
        type="text"
        placeholder="imdbId"
        value={imdbId}
        onChange={event => setImdbId(event.target.value)}
      />
      <button className="form__button" type="submit">
        Add movie
      </button>
    </form>
  );
};
