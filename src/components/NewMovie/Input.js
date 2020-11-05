import React from 'react';
import PropTypes from 'prop-types';

export const Input = (props) => {
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
        value={values}
        onChange={handleChange}
      />
      {errors[movie] && (
        <label>{errors[movie]}</label>
      )}
    </div>
  );
};

Input.propTypes = {
  values: PropTypes.string.isRequired,
  movie: PropTypes.string.isRequired,
  errors: PropTypes.shape(PropTypes.string).isRequired,
  handleChange: PropTypes.func.isRequired,
};
