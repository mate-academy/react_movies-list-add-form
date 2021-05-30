import React from 'react';
import PropTypes from 'prop-types';

export const InputFieldBlock = ({
  title,
  labelFor,
  inputType,
  required,
  inputId,
  inputClass,
  inputName,
  inputValue,
  inputOnChange,
}) => (
  <>
    <label
      htmlFor={labelFor}
      className="movie-form__label"
    >
      {title}
      :&nbsp;
      <br />
      <input
        type={inputType}
        id={inputId}
        name={inputName}
        className={inputClass}
        value={inputValue}
        onChange={inputOnChange}
        required={required}
      />
    </label>
  </>
);

InputFieldBlock.propTypes = {
  title: PropTypes.string.isRequired,
  labelFor: PropTypes.string.isRequired,
  inputType: PropTypes.string.isRequired,
  inputId: PropTypes.string.isRequired,
  inputClass: PropTypes.string.isRequired,
  inputName: PropTypes.string.isRequired,
  required: PropTypes.bool.isRequired,
  inputValue: PropTypes.string.isRequired,
  inputOnChange: PropTypes.func.isRequired,
};
