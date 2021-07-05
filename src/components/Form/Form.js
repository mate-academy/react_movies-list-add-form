import React from 'react';
import PropTypes from 'prop-types';

const Form = (props) => {
  const {
    name,
    value,
    label,
    onChange,
  } = props;

  return (
    <div className="form-group">
      <label htmlFor={name}>
        {label}
      </label>
      <div>
        <input
          className="form-control"
          name={name}
          type="text"
          value={value}
          required
          autoComplete="off"
          onChange={onChange}
        />
      </div>
    </div>
  );
};

Form.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Form;
