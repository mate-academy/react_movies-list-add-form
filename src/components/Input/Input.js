import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export const Input = ({ inputName, value, error, onChange, onBlur }) => {
  let errorMessage;

  if (error === 'empty') {
    errorMessage = 'this field can not be empty';
  } else if (error === 'invalid') {
    errorMessage = 'this field must be an url';
  }

  return (
    <div className="NewMovie__input-field">
      <input
        className={
          classNames(
            'NewMovie__input',
            {
              'NewMovie__input--invalid': error === 'invalid'
                || error === 'empty',
            },
          )
        }
        type="text"
        name={inputName}
        placeholder={inputName}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />

      <p className="NewMovie__error">
        {errorMessage}
      </p>
    </div>
  );
};

Input.propTypes = {
  inputName: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
};
