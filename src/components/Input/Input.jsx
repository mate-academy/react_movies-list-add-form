import React from 'react';
import PropTypes from 'prop-types';
import './Input.scss';

export const Input = ({ name, className, onChange }) => (
  <input
    type="text"
    placeholder={name}
    className={className}
    onChange={onChange}
    name={name}
  />
);

Input.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
