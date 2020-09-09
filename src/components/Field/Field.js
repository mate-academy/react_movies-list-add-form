import React from 'react';
import PropTypes from 'prop-types';

export const Field = ({
  name, error, handleChange, validation, value, isValid,
}) => {
  let option;
  let classTitle;

  if (name.includes('Url')) {
    option = 'url';
  } else if (name === 'title' || name === 'imdbId') {
    option = 5;
  } else {
    option = 0;
  }

  if (isValid === false) {
    classTitle = 'no-verified';
  } else if (isValid === true) {
    classTitle = 'accepted';
  } else {
    classTitle = 'before-verification';
  }

  return (
    <div>
      <input
        className={`${classTitle} form_input`}
        value={value}
        placeholder={name}
        type="text"
        name={`${name}`}
        onChange={event => handleChange(event, value)}
        onBlur={event => validation(event, option)}
      />
      <p className="errors">{error}</p>
    </div>
  );
};

Field.propTypes = {
  name: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  validation: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  isValid: PropTypes.bool.isRequired,
};
