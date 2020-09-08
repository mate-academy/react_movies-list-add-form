import React from 'react';
import PropTypes from 'prop-types';

export const Template = ({ title, name, placeholder, onChange, value }) => {
  return (
    <label className="label">
      {title}
      <input
        type="text"
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="input"
      />
    </label>
  );
};

Template.propTypes = {
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};
