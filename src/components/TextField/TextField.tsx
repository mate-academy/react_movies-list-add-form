import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  name: string;
  value: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  onChange?: (newValue: string) => void;
  validate?: (newValue: string) => string;
};

function getRandomDigits() {
  return Math.random().toFixed(16).slice(2);
}

export const TextField: React.FC<Props> = ({
  name,
  value,
  label = name,
  placeholder = `Enter ${label}`,
  required = false,
  onChange = () => {},
  validate = () => {},
}) => {
  // generate a unique id once on component load
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  const [errorMessage, setErrorMessage] = useState('');

  const handleOnBlur = (
    event: React.FocusEvent<HTMLInputElement, Element>,
  ): void => {
    const fieldValue = event.target.value.trim();

    if (required) {
      if (fieldValue === '') {
        setErrorMessage(`${label} is required`);

        return;
      } else {
        setErrorMessage('');
      }

      const validateResult = validate(fieldValue);

      if (validateResult) {
        setErrorMessage(validateResult);

        return;
      }
    }
  };

  return (
    <div className="field">
      <label className="label" htmlFor={id}>
        {label}
      </label>

      <div className="control">
        <input
          name={name}
          type="text"
          id={id}
          data-cy={`movie-${name}`}
          className={classNames('input', {
            'is-danger': errorMessage,
          })}
          placeholder={placeholder}
          value={value}
          onChange={event => onChange(event.target.value)}
          onBlur={event => {
            handleOnBlur(event);
          }}
        />
      </div>

      {errorMessage && <p className="help is-danger">{errorMessage}</p>}
    </div>
  );
};
