import React from 'react';
import PropTypes from 'prop-types';

export const InputForm = ({ inputName, inputValue, addChange, error }) => (
  <label
    className="label"
    htmlFor="title"
  >
    {inputName[0].toUpperCase() + inputName.slice(1)}
    <input
      className="ui focus input"
      type="text"
      id={inputName}
      name={inputName}
      value={inputValue}
      onChange={addChange}
    />
    <p className={error ? 'ui red pointing basic label' : ''}>
      {error ? `Fill out the ${inputName} form please` : ''}
    </p>
  </label>
);

InputForm.propTypes = {
  inputName: PropTypes.string.isRequired,
  inputValue: PropTypes.string.isRequired,
  addChange: PropTypes.func.isRequired,
  error: PropTypes.bool.isRequired,
};
