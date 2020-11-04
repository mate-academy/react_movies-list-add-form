import React from 'react';
import propTypes from 'prop-types';

const getformatedName = name => (
  name[0].toUpperCase() + name.slice(1)
);

export const Input = ({ name, value, onChange }) => (
  <label>
    {getformatedName(name)}
    <input
      className="input"
      key={name}
      type="text"
      name={name}
      placeholder={name}
      value={value}
      onChange={onChange}
      required
    />
  </label>
);

Input.propTypes = {
  name: propTypes.string.isRequired,
  value: propTypes.string.isRequired,
  onChange: propTypes.func.isRequired,
};
