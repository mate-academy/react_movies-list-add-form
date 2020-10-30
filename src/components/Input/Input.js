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
  <div className="field">
    <label htmlFor={name} className="label">
      {name[0].toUpperCase() + name.slice(1)}
    </label>
    <div>
      <input
        className="input"
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
    </div>
  </div>
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
