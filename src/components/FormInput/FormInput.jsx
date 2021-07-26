import React from 'react';
import classNames from 'classnames';
import { InputShape } from '../../types';

export const FormInput = ({
  title,
  inputId,
  value,
  action,
  validator,
}) => {
  const inputClass = classNames({
    'form-control': true,
    'is-invalid': validator === false,
    'is-valid': validator === true,
  });

  return (
    <div className="input-group mb-3">
      <label className="input-group-text" htmlFor={inputId}>
        {title}
      </label>
      <input
        id={inputId}
        type="text"
        className={inputClass}
        placeholder="write here"
        value={value}
        onChange={action}
      />
      <div className="valid-feedback">
        Looks good!
      </div>
      <div className="invalid-feedback">
        {`Please provide a valid ${title}.`}
      </div>
    </div>
  );
};

FormInput.propTypes = InputShape;
