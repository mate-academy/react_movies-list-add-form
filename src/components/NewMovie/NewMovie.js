import React from 'react';
import PropTypes from 'prop-types';
import './NewMovie.scss';

export const NewMovie = ({ onAdd }) => {
  const handleSubmit = (event) => {
    event.preventDefault();

    const [title, description, imgUrl, imdbUrl, imdbId] = event.target;

    onAdd({
      title: title.value,
      description: description.value,
      imgUrl: imgUrl.value,
      imdbUrl: imdbUrl.value,
      imdbId: imdbId.value,
    });

    event.target.reset();
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label>
        <h3 className="form__title">Movie title</h3>
        <input
          type="text"
          name="title"
          className="form__input"
          placeholder="Please enter a movie title"
          autoComplete="off"
          required
        />
      </label>
      <label>
        <h3 className="form__title">Movie description</h3>
        <input
          type="text"
          name="description"
          className="form__input"
          placeholder="Please enter a movie description"
          autoComplete="off"
          required
        />
      </label>
      <label>
        <h3 className="form__title">Movie poster</h3>
        <input
          type="text"
          name="imgUrl"
          className="form__input"
          placeholder="Please enter a link to movie poster"
          autoComplete="off"
          required
        />
      </label>
      <label>
        <h3 className="form__title">Movie IMDb link</h3>
        <input
          type="text"
          name="imdbUrl"
          className="form__input"
          placeholder="Please enter a IMDb link"
          autoComplete="off"
          required
        />
      </label>
      <label>
        <h3 className="form__title">Movie IMDb ID</h3>
        <input
          type="text"
          name="imdbId"
          className="form__input"
          placeholder="Please enter a IMDb ID"
          autoComplete="off"
          required
        />
      </label>
      <button type="submit" className="form__btn">Add movie</button>
    </form>
  );
};

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};
