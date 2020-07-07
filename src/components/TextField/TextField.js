import React from 'react';
import PropTypes from 'prop-types';

export const TextField = (props) => {
  const {
    name,
    value,
    label,
    placeholder,
    onChange,
  } = props;

  return (
    <div>
      <label>
        {label}
        <input
          type="text"
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
        />
      </label>
    </div>
  );
};

TextField.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
