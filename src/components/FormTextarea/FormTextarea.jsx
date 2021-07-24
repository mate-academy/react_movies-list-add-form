import React from 'react';
import { InputShape } from '../../types';

export const FormTextarea = ({
  title,
  inputId,
  value,
  action,
}) => (
  <div className="input-group mb-3">
    <label className="input-group-text" htmlFor={inputId}>
      {title}
    </label>
    <textarea
      id={inputId}
      className="form-control"
      aria-label="With textarea"
      value={value}
      onChange={action}
    />
  </div>
);

FormTextarea.propTypes = InputShape;
