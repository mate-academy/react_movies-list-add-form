import React from 'react';
import PropTypes from 'prop-types';
import './MovieInput.scss';

const MovieInput = (
  { name, value, placeholder, changeStateValue, inputHasError },
) => (

  <input
    className={inputHasError ? 'error input' : 'input'}
    autoComplete="off"
    name={name}
    value={value}
    placeholder={placeholder}
    onChange={changeStateValue}
  />

);

MovieInput.defaultProps = {
  inputHasError: false,
};

MovieInput.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  changeStateValue: PropTypes.func.isRequired,
  inputHasError: PropTypes.bool,
};

export default MovieInput;
