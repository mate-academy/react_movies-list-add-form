import React from 'react';
import PropTypes from 'prop-types';
import './MovieInput.scss';

export const MovieInput = ({
  title,
  name,
  value,
  onChange,
}) => (
  <div className="MovieInput">
    <label htmlFor={name}>
      {title}
    </label>
    <input
      type="text"
      placeholder={`Enter ${name}`}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
    />
  </div>
);

MovieInput.propTypes = {
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
