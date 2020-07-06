import React from 'react';
import './InputForm.scss';
import { InputFormTypes } from '../Shapes/Shapes';

export const InputForm = (props) => {
  const {
    text,
    value,
    name,
    error,
    onChange,
    onBlur,
  } = props;

  return (
    <label className="label">
      {text}
      <input
        className={error ? 'input input--error' : 'input'}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      {error
        ? (
          <span className="error__message">
            {`Please, type correct ${text}`}
          </span>
        )
        : ''}

    </label>
  );
};

InputForm.propTypes = InputFormTypes;
