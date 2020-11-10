import React from 'react';
import PropTypes from 'prop-types';

export function Input({ placeholder, value, name, onChange, label, error }) {
  return (
    <div className="input-container">
      <label>
        {`${label}: `}
        <br />
        <input
          type="text"
          value={value}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
        />
        <span className="error">{error}</span>
      </label>
    </div>
  );
}

Input.propTypes = {
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  error: PropTypes.string,
};

Input.defaultProps = {
  placeholder: '',
  label: '',
  error: '',
};
