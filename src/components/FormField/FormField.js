import React from 'react';
import PropTypes from 'prop-types';

export const FormField = (props) => {
  const {
    name,
    value,
    label,
    placeholder,
    onChange,
  } = props;

  return (
    <div className="field">
      <label htmlFor={name} className="label">
        {label}
      </label>
      <div className="control">
        <input
          required
          name={name}
          className="input"
          type="text"
          autoComplete="off"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

FormField.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
