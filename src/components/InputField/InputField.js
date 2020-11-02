import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './InputField.css';

export const InputField = ({
  name,
  value,
  error,
  onChange,
  onBlur,
}) => {
  return (
    <div className="input-wrapper">
      <label
        htmlFor={name}
        className="text-capitalize font-weight-bold"
      >
        {name}
      </label>

      <input
        type="text"
        name={name}
        id={name}
        placeholder={name}
        className={classNames('form-control input', {
          'is-danger': error,
        })}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        autoComplete="off"
      />

      {error
      && <p className="text-danger">{`Please, add ${name}`}</p>
      }
    </div>
  );
};

InputField.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  error: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
};

InputField.defaultProps = {
  error: false,
  onBlur: () => {},
};
