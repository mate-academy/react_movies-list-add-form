import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

export const NewField = (props) => {
  const {
    name,
    value,
    onChange,
    isValid,
  } = props;

  return (
    <div className="field">
      <label htmlFor={name}>{`${name}:`}</label>
      {
        isValid
          ? (<p className="text-error help is-danger">{`Enter ${name}!`}</p>)
          : (<p className="text-error help is-danger"> </p>)
      }
      <input
        name={name}
        id={name}
        value={value}
        autoComplete="off"
        className={
          cx('input', 'is-primary', 'is-small', { 'is-danger': isValid })
        }
        type="text"
        onChange={onChange}
      />
    </div>

  );
};

NewField.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  isValid: PropTypes.bool,
};

NewField.defaultProps = {
  isValid: false,
};
