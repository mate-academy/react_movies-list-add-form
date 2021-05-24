import React from 'react';
import './Input.scss';
import PropTypes from 'prop-types';
import classNames from 'classnames';

function Input({
  name, value, placeholder, isError, onChange, onFocus, errorMes,
}) {
  return (
    <div className="wrapper">
      <label htmlFor={name}>
        <h2 className="fieldTitle">
          {placeholder}
          :
        </h2>
        <input
          id={name}
          value={value}
          type="text"
          name={name}
          placeholder={placeholder.toLowerCase()}
          className={classNames(
            'textField', { redBorder: isError },
          )}
          onChange={event => onChange(event)}
          onBlur={event => onFocus(event)}
        />
      </label>
      <p
        className={classNames(
          'errorMes', { visible: isError },
        )}
      >
        *
        {' '}
        {errorMes}
      </p>
    </div>
  );
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  isError: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  errorMes: PropTypes.string.isRequired,
};

export default Input;
