import React from 'react';
import PropTypes from 'prop-types';

export function Input({ name, value, onChange }) {
  return (
    <div className="movie-form">
      <label htmlFor={name}>
        {name}
      </label>
      <input
        id={name}
        required={(name !== 'description')}
        value={value}
        onChange={event => onChange(event, name)}
      />
    </div>
  );
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
