import React, { memo } from 'react';
import PropTypes from 'prop-types';

export const NewMovieField = memo(
  ({ title, value, handleOnChange, checkValidation, isValid }) => (
    <div className="form__item">
      <label htmlFor={`field${title}`}>{title}</label>
      <input
        type="text"
        placeholder={`${title}...`}
        className={`form__input ${!isValid && 'form__input-invalid'}`}
        id={`field${title}`}
        value={value}
        onChange={(event) => {
          handleOnChange(title, event.target.value);
        }}
        onBlur={() => checkValidation(title)}
      />
      {
        !isValid && <small className="form__error">Field is invalid</small>
      }
    </div>
  ),
);

NewMovieField.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleOnChange: PropTypes.func.isRequired,
  checkValidation: PropTypes.func.isRequired,
  isValid: PropTypes.bool.isRequired,
};
