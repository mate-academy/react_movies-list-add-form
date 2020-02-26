import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import '../../App.scss';

export const Input = (props) => {
  const {
    id,
    value,
    placeholder,
    onChange,
    name,
    errors,
  } = props;

  return (
    <div className="control inputWrapper">
      <label htmlFor={id} className="label">{name}</label>
      <input
        id={id}
        name={name}
        className={cn('input', { 'is-danger': errors && value.length < 3 })}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {errors && (
        <p className="help is-danger">
          {`This ${name} is invalid`}
        </p>
      )}
    </div>
  );
};

Input.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  errors: PropTypes.bool,
};

Input.defaultProps = {
  errors: false,
};
