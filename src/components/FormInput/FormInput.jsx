import React from 'react';
import propTypes from 'prop-types';
import './FormInput.scss';

export const FormInput = ({ inputType, onChange }) => (
  <label className="FormInput">
    <span className="FormInput__info">
      {inputType}
    </span>
    <input
      type="text"
      name={inputType}
      onChange={onChange}
      placeholder={inputType}
      required
    />
  </label>
);

FormInput.propTypes = {
  inputType: propTypes.string.isRequired,
  onChange: propTypes.func.isRequired,
};
