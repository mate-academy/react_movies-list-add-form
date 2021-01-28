import React from 'react';
import PropTypes from 'prop-types';

export const Input = ({ inputName, inputValue, addChange, error }) => {
  const createTitle = (title) => {
    return title[0].toUpperCase() + title.slice(1);
  };

  return (
    <label
      className="label"
      htmlFor="title"
    >
      {createTitle(inputName)}
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
};

Input.propTypes = {
  inputName: PropTypes.string.isRequired,
  inputValue: PropTypes.string.isRequired,
  addChange: PropTypes.func.isRequired,
  error: PropTypes.bool.isRequired,
};
