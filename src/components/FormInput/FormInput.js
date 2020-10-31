import React from 'react';
import classNames from 'classnames';
import { FormInputProps } from '../../props/FormInputProps';

export const FormInput = React.memo(({
  name,
  value,
  handleChange,
  handleBlur,
  isValid,
}) => (
  <div>
    <label className="form-group row">
      {name[0].toUpperCase() + name.slice(1)}
      <input
        name={name}
        placeholder={`Enter ${name}`}
        className={classNames('form-control', {
          'is-invalid': !isValid,
        })}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        aria-describedby="validationFeedback"
        autoComplete="off"
      />
      <div id="validationFeedback" className="invalid-feedback">
        Please enter a valid state
      </div>
    </label>
  </div>
));

FormInput.propTypes = FormInputProps;

FormInput.defaultProps = {
  value: '',
  isValid: true,
};
