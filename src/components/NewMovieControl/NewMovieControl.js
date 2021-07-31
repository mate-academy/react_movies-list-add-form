import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './NewMovieControl.scss';

export function NewMovieControl({
  value,
  name,
  title,
  handleChange,
  inputValidation,
  validationKey,
  isValid,
}) {
  return (
    <label className="form-label">
      {`${title}: `}
      <input
        className={classNames('form-control', {
          'form-control--invalid': !isValid,
        })}
        type="text"
        name={name}
        value={value}
        onChange={event => handleChange(event, validationKey)}
        onBlur={() => inputValidation(name, validationKey)}
      />
      <span
        className={classNames('error-message', {
          'error-message--visible': !isValid,
        })}
      >
        {`${title} is invalid!`}
      </span>
    </label>
  );
}

NewMovieControl.propTypes = {
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  inputValidation: PropTypes.func.isRequired,
  validationKey: PropTypes.string.isRequired,
  isValid: PropTypes.bool,
};

NewMovieControl.defaultProps = {
  isValid: true,
};
