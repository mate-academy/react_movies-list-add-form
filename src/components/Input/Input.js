import React from 'react';
import PropTypes from 'prop-types';

import './Input.scss';

export const Input = ({ name, onChange, valid, onBlur }) => {
  return (
    <div className="form-group">
      <label htmlFor={name} className="form-label">
        {name}
      </label>
      <input
        className={`form-input ${valid ? '' : 'form-input-error'}`}
        name={name}
        id={name}
        placeholder={`${name === 'imdbUrl'
          || name === 'imgUrl' ? 'https://www.example.com' : `${name}`}`}
        onChange={event => onChange(event.target.name, event.target.value)}
        onBlur={event => onBlur(event.target.name, event.target.value)}
        required
      />
      <span
        className={`error-message ${valid ? '' : 'error-message-visible'}`}
      >
        {name === 'imdbUrl'
          || name === 'imgUrl' ? 'Invalid url' : 'Empty field'}
      </span>
    </div>
  );
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  valid: PropTypes.bool.isRequired,
  onBlur: PropTypes.func.isRequired,
};
