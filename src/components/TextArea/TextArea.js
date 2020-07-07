import React from 'react';
import PropTypes from 'prop-types';

export const TextArea = ({ name, onChange }) => {
  return (
    <div className="form-group">
      <label htmlFor={name} className="form-label">
        {name}
      </label>
      <textarea
        className="form-input"
        name={name}
        id={name}
        onBlur={event => onChange(event)}
      />
    </div>
  );
};

TextArea.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
