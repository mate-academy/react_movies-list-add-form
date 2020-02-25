import React from 'react';
import PropTypes from 'prop-types';

export const TextField = (props) => {
  const {
    value,
    onChange,
    label,
    name,
    placeholder,
    error,
    onBlur,
  } = props;

  const inputClass = error ? 'input is-danger' : 'input ';

  return (
    <div className="field">
      <label htmlFor={name} className="label">
        {label}
      </label>

      <div className="control">
        <input
          onBlur={onBlur}
          id={name}
          name={name}
          className={inputClass}
          type="text"
          autoComplete="off"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </div>
      {error && (
        <p className="help is-danger">
          {error}
        </p>
      )}
    </div>
  );
};

TextField.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  onBlur: PropTypes.func.isRequired,
};

TextField.defaultProps = {
  placeholder: 'Enter text here',
  error: '',
};
