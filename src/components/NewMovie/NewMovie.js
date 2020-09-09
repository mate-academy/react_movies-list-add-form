import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './NewMovie.scss';

const newMovie = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

export const NewMovie = ({ addMovie }) => {
  const [movie, setMovie] = useState(newMovie);

  const infoHeadlines = Object.keys(newMovie);

  const handleSubmit = (e) => {
    e.preventDefault();

    addMovie(movie);
    setMovie(newMovie);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setMovie({
      ...movie,
      [name]: value,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      {infoHeadlines.map(heading => (
        <>
          <input
            type="text"
            className="form__input"
            key={heading}
            name={heading}
            value={movie[heading]}
            placeholder={heading}
            onChange={handleChange}
            required={heading !== 'description'}
          />
        </>
      ))
      }
      <button
        type="submit"
        className="button__submit"
      >
        Add New Movie
      </button>
    </form>
  );
};

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};
