import React from 'react';
import PropTypes from 'prop-types';

export const Input = (
  { type,
    name,
    pattern,
    required,
    value,
    handleChange,
    handleBlur },
) => (
  <label htmlFor={name}>
    {name}
    <input
      type={type}
      name={name}
      id={name}
      placeholder={name}
      pattern={pattern}
      required={required}
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
    />
  </label>
);

Input.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  pattern: PropTypes.string,
  required: PropTypes.bool,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func,
};

Input.defaultProps = {
  type: 'text',
  pattern: '.+',
  required: true,
  handleBlur: () => {},
};
