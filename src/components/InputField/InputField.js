import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';

export const InputField = ({
  name,
  value,
  label,
  onChange,
  hasError,
  errorMessage,
  onBlur,
}) => (
  <div className="field">
    <label
      htmlFor={name}
      className="label"
    >
      {label}
    </label>

    <input
      type="text"
      className={ClassNames('input', {
        'is-danger': hasError,
      })}
      name={name}
      id={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
    />

    {hasError && (
      <p className="help is-danger">
        {errorMessage}
      </p>
    )}
  </div>
);

InputField.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  hasError: PropTypes.bool,
  errorMessage: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
};

InputField.defaultProps = {
  hasError: false,
  errorMessage: '',
};
