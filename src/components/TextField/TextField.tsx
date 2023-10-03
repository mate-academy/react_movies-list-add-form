import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  name: string,
  value: string,
  label?: string,
  placeholder?: string,
  required?: boolean,
  onChange?: (newValue: React.ChangeEvent<HTMLInputElement>) => void,
};

function getRandomDigits() {
  return Math.random()
    .toFixed(16)
    .slice(2);
}

export const TextField: React.FC<Props> = ({
  name,
  value,
  label = name,
  placeholder = `Enter ${label}`,
  required = false,
  onChange = () => {},
}) => {
  const [id] = useState(() => `${name}-${getRandomDigits()}`);
  const [errorMessage, setErrorMessage] = useState('');

  const hadleError = () => {
    if (required && !value) {
      setErrorMessage(`${label} is required`);
    } else if (value && value.trim() === '') {
      setErrorMessage('Input can\'t be filled with only spaces');
    } else {
      setErrorMessage('');
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
            'is-danger': errorMessage !== '',
          })}
          placeholder={placeholder}
          value={value}
          onChange={(event) => onChange(event)}
          onBlur={() => hadleError()}
        />
      </div>

      {errorMessage !== '' && (
        <p className="help is-danger">{errorMessage}</p>
      )}
    </div>
  );
};
