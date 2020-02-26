import React from 'react';
import PropTypes from 'prop-types';
import * as cx from 'classnames';

export const TextField = (props) => {
  const {
    value,
    onChange,
    label,
    name,
    placeholder,
    error,
  } = props;

  const inputClass = cx('input', {
    'is-danger': !!error,
  });

  return (
    <div className="field">
      <label htmlFor={name} className="label">
        {label}
      </label>

      <div className="control">
        <input
          id={name}
          name={name}
          className={inputClass}
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </div>
      {error
        && (
          <p className="help is-danger">
            {error}
          </p>
        )}
    </div>
  );
};

TextField.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  error: PropTypes.string,
};

TextField.defaultProps = {
  placeholder: 'Enter text here',
  error: '',
};
