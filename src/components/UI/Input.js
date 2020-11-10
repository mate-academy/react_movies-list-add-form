/* eslint-disable arrow-parens */
import React from 'react';
import PropTypes from 'prop-types';

export function Input({ placeholder, value, onChange, name, label, error }) {
  return (
    <div className="input-container">
      <label>
        {`${label}: `}
        <br />
        <input
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e)}
          name={name}
        />
        <span className="error">{error ? `${error}` : ''}</span>
      </label>
    </div>
  );
}

Input.propTypes = {
  placeholder: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
};

Input.defaultProps = {
  placeholder: '',
  label: '',
  error: '',
};
