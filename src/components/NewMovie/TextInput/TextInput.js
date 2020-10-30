import React from 'react';
import PropTypes from 'prop-types';

export const TextInput = React.memo(({
  name,
  value,
  label,
  placeholder,
  hasError,
  errorText,
  onChange,
  onBlur,
}) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        type="text"
        id={name}
        name={name}
        value={value}
        placeholder={placeholder}
        className="form-control"
        onChange={onChange}
        onBlur={onBlur}
        autoComplete="off"
      />
      {hasError && (
        <p className="text-danger">
          {errorText}
        </p>
      )}
    </div>
  );
});

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  hasError: PropTypes.bool,
  errorText: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
};

TextInput.defaultProps = {
  hasError: false,
  errorText: '',
  onBlur: () => {},
};
