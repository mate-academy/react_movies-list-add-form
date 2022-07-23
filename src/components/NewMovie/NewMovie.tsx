import React, { useState } from 'react';
import './NewMovie.scss';

type Props = {
  addMovie: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ addMovie }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const clearForm = () => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  const generateMovie = (event: React.FormEvent) => {
    event.preventDefault();

    const movie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    addMovie(movie);

    clearForm();
  };

  return (
    <form className="form" onSubmit={generateMovie}>
      <input
        data-cy="form-title"
        className="input is-small"
        name="title"
        value={title}
        type="text"
        placeholder="Title"
        onChange={event => setTitle(event.target.value)}
        required
      />
      <textarea
        data-cy="form-description"
        className="textarea is-small"
        name="description"
        value={description}
        placeholder="Description"
        onChange={event => setDescription(event.target.value)}
      />
      <input
        data-cy="form-imgUrl"
        className="input is-small"
        name="imgUrl"
        value={imgUrl}
        type="text"
        placeholder="imgUrl"
        onChange={event => setImgUrl(event.target.value)}
        required
      />
      <input
        data-cy="form-imdbUrl"
        className="input is-small"
        name="imdbUrl"
        value={imdbUrl}
        type="text"
        placeholder="imdbUrl"
        onChange={event => setImdbUrl(event.target.value)}
        required
      />
      <input
        data-cy="form-imdbId"
        className="input is-small"
        name="imdbId"
        value={imdbId}
        type="text"
        placeholder="imdbId"
        onChange={event => setImdbId(event.target.value)}
        required
      />
      <button
        data-cy="form-submit-button"
        className="button is-link"
        type="submit"
      >
        Add
      </button>
    </form>
  );
};
