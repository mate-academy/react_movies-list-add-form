import React from 'react';
import PropTypes from 'prop-types';

export const Input = ({ fieldName, value, onChange }) => (
  <>
    <label
      htmlFor={fieldName}
      className="ui large label"
    >
      {fieldName[0].toUpperCase() + fieldName.slice(1)}
    </label>
    <input
      key={fieldName}
      type="text"
      name={fieldName}
      value={value}
      onChange={onChange}
      required
    />
  </>
);

Input.propTypes = {
  fieldName: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
