import React from 'react';
import PropTypes from 'prop-types';

export const InputForm = ({ onChange, text, value }) => (
  <label>
    {text}
    <input
      required
      onChange={onChange}
      value={value}
    />
  </label>
);

InputForm.propTypes = {
  onChange: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};
