import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  name: string,
  value: string,
  label?: string,
  required?: boolean,
  onChange?: (newValue: string) => void,
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
  // generage a unique id once on component load
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  // To show errors only if the field was touched (onBlur)
  const [touched, setTouched] = useState(false);
  const [isValid, setIsValid] = useState<null | boolean>(null);

  const hasError = touched && required && !value;
  const showErrorMessage = hasError || isValid === false;
  const validInvalidText = isValid === false
    ? 'incorrect'
    : 'required';
  const errorMessage = `${label} is ${validInvalidText}`;

  const handleOnBLur = (event: React.FocusEvent<HTMLInputElement>) => {
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
          onChange={event => onChange(event.target.value)}
          onBlur={handleOnBLur}
        />
      </div>

      {(showErrorMessage) && (
        <p className="help is-danger">{errorMessage}</p>
      )}
    </div>
  );
};
