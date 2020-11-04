import React from 'react';
import PropTypes from 'prop-types';

export const Inputs = (props) => {
  const { values, movie, errors, handleChange } = props;

  return (
    <div className={`field ${errors[movie] ? 'error' : ''}`}>
      <label htmlFor={movie}>
        {movie.toUpperCase()}
      </label>
      <input
        type="text"
        name={movie}
        id={movie}
        value={values[movie]}
        onChange={handleChange}
      />
      {errors[movie] && (
        <label>{errors[movie]}</label>
      )}
    </div>
  );
};

Inputs.propTypes = {
  values: PropTypes.string.isRequired,
  errors: PropTypes.string.isRequired,
  movie: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};
