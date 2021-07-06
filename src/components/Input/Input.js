import React from 'react';
import PropTypes from 'prop-types';

export const Input = ({
  name,
  value,
  error,
  handleChange,
  onBlur,
}) => (
  <>
    <label
      key={name}
      className="label"
      htmlFor={name}
    >
      {name}
    </label>
    <input
      className={error
        ? 'input input--error'
        : 'input'}
      type="text"
      id={name}
      name={name}
      value={value}
      placeholder={name}
      onChange={handleChange}
      onBlur={onBlur}
    />
    {error && (
      <div className="error">Please enter correct value</div>
    )}
  </>
);

Input.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  error: PropTypes.bool,
  handleChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
};

Input.defaultProps = {
  error: null,
};
