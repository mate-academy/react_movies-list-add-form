import React from 'react';
import PropTypes from 'prop-types';
import './FormInput.scss';

export const FormInput = ({ inputName, inputTitle, onChange }) => (
  <>
    <label className="form__label" htmlFor={inputName}>
      {`Movie: ${inputName}`}
    </label>
    <input
      className="form__input"
      type="text"
      name={inputName}
      id={inputName}
      value={inputTitle}
      onChange={onChange}
    />
  </>
);

FormInput.propTypes = {
  inputTitle: PropTypes.string.isRequired,
  inputName: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
