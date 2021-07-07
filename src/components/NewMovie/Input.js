import React from 'react';
import PropTypes from 'prop-types';

export const Input = (props) => {
  const { value, movie, error, handleChange } = props;

  return (
    <div className={`field ${error ? 'error' : ''}`}>
      <label htmlFor={movie}>
        {movie.toUpperCase()}
      </label>
      <input
        type="text"
        name={movie}
        id={movie}
        value={value}
        onChange={handleChange}
      />
      {error && (
        <label>{error}</label>
      )}
    </div>
  );
};

Input.propTypes = {
  value: PropTypes.string.isRequired,
  movie: PropTypes.string.isRequired,
  error: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
};

Input.defaultProps = {
  error: null,
};
