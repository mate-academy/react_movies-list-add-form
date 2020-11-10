import React from 'react';
import PropTypes from 'prop-types';

const FormInput = ({ fieldName, value, onChange }) => (
  <>
    <label
      className="ui pointing below label"
      htmlFor={fieldName}
    >
      {fieldName[0].toUpperCase() + fieldName.slice(1)}
    </label>
    <input
      className="ui input"
      key={fieldName}
      type="text"
      name={fieldName}
      value={value}
      onChange={onChange}
      required
    />
    <div className="field" />
  </>
);

FormInput.propTypes = {
  fieldName: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default FormInput;
