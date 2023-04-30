import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  name: string,
  value: string,
  label?: string,
  required?: boolean,
  onChange?: (newValue: string) => void,
  validateCustom?: (target: HTMLInputElement) => boolean,
};

function getRandomDigits() {
  return Math.random().toString().slice(2);
}

export const TextField: React.FC<Props> = ({
  name,
  value,
  label = name,
  required = false,
  onChange = () => {},
  validateCustom = () => true,
}) => {
  const [id] = useState(() => `${name}-${getRandomDigits()}`);
  const [touched, setToched] = useState(false);
  const [customValid, setCustomValid] = useState(true);

  const hasError = (touched && required && !value) || !customValid;

  const checkCustom = (target: HTMLInputElement) => {
    setCustomValid(validateCustom(target));
  };

  const onTextFieldChange = (target: EventTarget & HTMLInputElement) => {
    onChange(target.value);
    checkCustom(target);
    setCustomValid(true);
  };

  return (
    <div className="field">
      <label className="label" htmlFor={id}>
        {label}
      </label>

      <div className="control">
        <input
          id={id}
          data-cy={`movie-${name}`}
          className={classNames('input', {
            'is-danger': hasError,
          })}
          type="text"
          placeholder={`Enter ${label}`}
          value={value}
          onChange={event => onTextFieldChange(event.target)}
          onBlur={(event) => {
            setToched(true);
            checkCustom(event.target);
          }}
        />
      </div>

      {hasError && (
        <p className="help is-danger">
          {value
            ? `${label} has to meet all requirements`
            : `${label} is required`}
        </p>
      )}
    </div>
  );
};
