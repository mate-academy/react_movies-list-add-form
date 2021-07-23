import React from 'react';
import PropTypes from 'prop-types';
import './MovieInputs.scss';

const MovieInputs = (
  { name, value, placeholder, changeStateValue, className },
) => (

  <input
    className={className ? 'error input' : 'input'}
    autoComplete="off"
    name={name}
    value={value}
    placeholder={placeholder}
    onChange={changeStateValue}
  />

);

MovieInputs.defaultProps = {
  className: false,
};

MovieInputs.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  changeStateValue: PropTypes.func.isRequired,
  className: PropTypes.bool,
};

export default MovieInputs;
