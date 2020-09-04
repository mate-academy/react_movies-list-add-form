import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './NewMovie.scss';

export const NewMovie = ({ addMovie }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    addMovie({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });
  }

  return (
    <form
      className="Form"
      onSubmit={event => handleSubmit(event)}
    >
      <input
        type="text"
        placeholder="Title"
        maxLength={20}
        onChange={e => setTitle(e.target.value)}
        value={title}
        className="Form__input"
        required
      />
      <textarea
        placeholder="Description"
        maxLength={200}
        onChange={e => setDescription(e.target.value)}
        value={description}
        className="Form__description Form__input"
      />
      <input
        type="url"
        placeholder="Image URL"
        maxLength={40}
        onChange={e => setImgUrl(e.target.value)}
        value={imgUrl}
        className="Form__input"
        required
      />
      <input
        type="url"
        placeholder="Imdb URL"
        maxLength={40}
        onChange={e => setImdbUrl(e.target.value)}
        value={imdbUrl}
        className="Form__input"
        required
      />
      <input
        type="text"
        placeholder="Imdb ID"
        maxLength={20}
        onChange={e => setImdbId(e.target.value)}
        value={imdbId}
        className="Form__input"
        required
      />
      <input type="submit" className="Form__submit" />
    </form>
  );
};

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};
