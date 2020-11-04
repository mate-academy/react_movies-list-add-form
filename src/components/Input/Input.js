import React from 'react';
import PropTypes from 'prop-types';

export const Input = (props) => {
  const { value,
    name,
    placeholder,
    labelText,
    id,
    onChange,
    error } = props;

  return (
    <div className="field">
      <label className="label" htmlFor={id}>
        {labelText}
        <div className="control">
          <input
            className={!error ? 'input' : 'input is-danger'}
            name={name || id}
            id={id}
            type="text"
            value={value}
            placeholder={placeholder}
            onChange={onChange}
          />
        </div>
      </label>
    </div>
  );
};

Input.defaultProps = {
  name: null,
  error: null,
};

Input.propTypes = {
  value: PropTypes.string.isRequired,
  name: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  labelText: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
};
