import React from 'react';
import PropTypes from 'prop-types';

const editedName = name => (
  name[0].toUpperCase() + name.slice(1)
);

export const Input = ({ name, value, onInputChange }) => (
  <label>
    {editedName(name)}
    <input
      className="input"
      type="text"
      name={name}
      placeholder={editedName(name)}
      value={value}
      onChange={onInputChange}
      required
    />
  </label>
);

Input.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
};
