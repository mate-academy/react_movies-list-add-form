import React from 'react';
import PropTypes from 'prop-types';

const Input = ({ formErrors, value, name, handleInput }) => {
  const inputClass = formErrors[name].length === 0 ? '' : 'has-error';

  return (
    <div className={`form-group ${inputClass}`}>
      <label htmlFor={name}>{name}</label>
      <input
        className="form-control"
        type="text"
        name={name}
        value={value}
        autoComplete="off"
        onChange={handleInput}
      />
      {formErrors[name].length
        ? <span className="formErrors">{formErrors[name]}</span>
        : ''}
    </div>
  );
};

Input.propTypes = {
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  handleInput: PropTypes.func.isRequired,
  formErrors: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default Input;
