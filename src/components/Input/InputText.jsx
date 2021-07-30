import React from 'react';
import PropTypes from 'prop-types';

export const InputText = React.memo(({
  name,
  value,
  onChange,
  required,
  validate,
  valid,
  onBlur,
  blured,
}) => {
  const requiredMessage = (required && !value.length && blured);
  const invalidMessage = (validate && !valid && blured);
  const getPlaceholder
    = name.charAt(0).toUpperCase() + name.slice(1) + (required ? '*' : '');

  return (
    <div>
      <input
        type="text"
        name={name}
        placeholder={
          getPlaceholder
        }
        className={
          `form-control mb-4 input
          ${requiredMessage || invalidMessage ? 'warning-input' : ''}`
        }
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        autoComplete="off"
      />
      {requiredMessage
        && (
          <span className="error-message">
            {`${name} is required`}
            <br />
          </span>
        )}
      {invalidMessage
        && (
          <span className="error-message">
            {`${name} is invalid`}
          </span>
        )}
    </div>
  );
});

InputText.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool.isRequired,
  validate: PropTypes.bool.isRequired,
  valid: PropTypes.bool.isRequired,
  onBlur: PropTypes.func.isRequired,
  blured: PropTypes.bool.isRequired,
};
