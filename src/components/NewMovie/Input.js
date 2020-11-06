import React from 'react';
import PropTypes from 'prop-types';

export const Input = (
  { name, handleChange, value },
) => (
  <>
    <label htmlFor={name}>{name}</label>
    <input
      className="input"
      name={name}
      id={name}
      onChange={handleChange}
      value={value}
      required
    />
  </>
);

Input.propTypes = {
  handleChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};
