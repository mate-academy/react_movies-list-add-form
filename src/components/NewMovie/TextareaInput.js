import React from 'react';
import PropTypes from 'prop-types';

export const TextareaInput = ({ onChange, description }) => (
  <label className="form__label">
    <p>Description:</p>
    <textarea
      className="form__textarea"
      value={description}
      id="description"
      onChange={onChange}
      autoComplete="off"
    />
  </label>
);

TextareaInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  description: PropTypes.string.isRequired,
};
