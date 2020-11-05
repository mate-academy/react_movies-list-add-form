import React from 'react';
import PropTypes from 'prop-types';

export const Input = ({ handlerChange, name, value }) => (
  <>
    <input
      type="text"
      className="form__input"
      name={name}
      placeholder={`Enter ${name}...`}
      value={value}
      onChange={handlerChange}
    />
  </>
);

Input.propTypes = {
  handlerChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};
