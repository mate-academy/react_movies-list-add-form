import React from 'react';
import PropTypes from 'prop-types';

const FormField = (props) => {
  const {
    name,
    value,
    label,
    placeholder,
    onChange,
  } = props;

  return (
    <div className="form__field">
      <label htmlFor={name} className="form__label">
        {label}
      </label>
      <div>
        <input
          required
          name={name}
          className="form__input"
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

export default FormField;
