import React from 'react';
import PropTypes from 'prop-types';

const classNames = require('classnames');

export const Input = ({ errorField, field, fieldName, onChange, onBlur }) => (
  <div>
    <input
      name={fieldName}
      placeholder={fieldName}
      type="text"
      value={field}
      className={
        classNames(
          'form-control',
          // eslint-disable-next-line no-nested-ternary
          `${errorField === 'valid'
            ? 'is-valid'
            : errorField
              ? 'is-invalid'
              : ''}`,
        )
      }
      onChange={event => onChange(event)}
      onBlur={() => {
        onBlur(
          fieldName, `error${fieldName[0].toUpperCase()}${fieldName.slice(1)}`,
        );
      }}
    />

    {/* eslint-disable-next-line no-nested-ternary */}
    {errorField === 'empty'
      ? <div>This field should not be empty</div>
      : errorField === 'invalid'
        ? <div>This should be URL</div>
        : ''}
  </div>
);

Input.propTypes = {
  errorField: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]).isRequired,
  field: PropTypes.string.isRequired,
  fieldName: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
};
