import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  name: string,
  value: string,
  label?: string,
  required?: boolean,
  onChange?: (newValue: string, key: string) => void,
  validate?: (string: string) => boolean,
};

function getRandomDigits() {
  return Math.random().toString().slice(2);
}

export const TextField: React.FC<Props> = ({
  name,
  value,
  label = name,
  required = false,
  onChange = () => { },
  validate = () => true,
}) => {
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  const [touched, setTouched] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const hasError = touched && required && !value;
  const validationError = touched && !isValid;
  const showErrorMessage = hasError || validationError;

  const errorText = value && isValid === false
    ? 'incorrect'
    : 'required';
  const errorMessage = `${label} is ${errorText}`;

  const handleOnBLur = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTouched(true);
    setIsValid(validate(event.target.value));
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
          onChange={event => {
            onChange(event.target.value, name);
          }}
          onBlur={handleOnBLur}
        />
      </div>

      {(showErrorMessage) && (
        <p className="help is-danger">{errorMessage}</p>
      )}
    </div>
  );
};
