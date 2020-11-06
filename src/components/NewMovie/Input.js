import React from 'react';
import PropTypes from 'prop-types';

export const Input = (
  { handleChange, name, hasError },
) => (
  <>
    <label htmlFor={name}>{name}</label>
    <input
      className="input"
      name={name}
      id={name}
      onChange={handleChange}
      required
    />
    {
      hasError
        ? <span className="form__error">{`Please enter the ${name}`}</span>
        : ''
    }
  </>
);

Input.propTypes = {
  handleChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  hasError: PropTypes.bool.isRequired,
};
