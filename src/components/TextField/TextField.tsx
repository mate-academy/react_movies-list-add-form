import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  name: string;
  value: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  onChange?: (newValue: string) => void;
  validationCallback?: (value: string) => string;
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
  validationCallback,
}) => {
  const [id] = useState(() => `${name}-${getRandomDigits()}`);
  const [errorMessage, setErrorMessage] = useState('');

  const handleBlur = () => {
    if (!value.trim() && required) {
      setErrorMessage(`${label} is required`);

      return;
    }

    if (validationCallback) {
      setErrorMessage(validationCallback(value.trim()));

      return;
    }
  };

  return (
    <div className="field">
      <label className="label" htmlFor={id}>
        {label}
      </label>

      <div className="control">
        <input
          type="text"
          id={id}
          data-cy={`movie-${name}`}
          className={classNames('input', {
            'is-danger': Boolean(errorMessage),
          })}
          placeholder={placeholder}
          value={value}
          onChange={event => {
            onChange(event.target.value);
            setErrorMessage('');
          }}
          onBlur={handleBlur}
        />
      </div>

      {Boolean(errorMessage) && (
        <p className="help is-danger">{errorMessage}</p>
      )}
    </div>
  );
};
