import React from 'react';
import PropTypes from 'prop-types';
import './FormInput.scss';

export const FormInput = ({ inputName, onChange, value }) => (
  <>
    <label className="form__label" htmlFor={inputName}>
      {`Movie ${inputName}`}
    </label>
    <input
      className="form__input"
      type="text"
      name={inputName}
      id={inputName}
      value={value}
      onChange={onChange}
    />
  </>
);

FormInput.propTypes = {
  inputName: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
