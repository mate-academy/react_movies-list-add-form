import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  name: string;
  value: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  pattern?: RegExp;
  onChange?: (newValue: string) => void;
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
  pattern,
  onChange = () => {},
}) => {
  const [id] = useState(() => `${name}-${getRandomDigits()}`);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const matchPattern = pattern ? pattern.test(value) : true;

  const hadleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let eventValue = event.target.value.trimStart();

    if (pattern) {
      eventValue = eventValue.trimEnd();
    }

    onChange(eventValue);
    setHasError(false);
  };

  const handleValidation = () => {
    if (required && !value) {
      setHasError(true);
      setErrorMessage(`${label} is required`);
    } else if (!matchPattern) {
      setHasError(true);
      setErrorMessage(`${label} is not valid`);
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
            'is-danger': hasError,
          })}
          placeholder={placeholder}
          value={value}
          onChange={hadleInputChange}
          onBlur={handleValidation}
        />
      </div>

      {hasError && <p className="help is-danger">{errorMessage}</p>}
    </div>
  );
};
