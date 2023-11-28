import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  name: string,
  value: string,
  label?: string,
  placeholder?: string,
  required?: boolean,
  onChange?: (newValue: string) => void,
  urlValidation?: (value: string) => boolean | void,
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
  urlValidation = () => {},
}) => {
  // generage a unique id once on component load
  const [id] = useState(() => `${name}-${getRandomDigits()}`);
  const [errorMessage, setErrorMessage] = useState('');

  const handleError = () => {
    if (required && !value) {
      setErrorMessage(`${label} is required`);

      return;
    }

    if (urlValidation(value)) {
      setErrorMessage('Incorrect Url format');

      return;
    }

    if (value && value.trim() === '') {
      setErrorMessage('Input can\'t be filleed with only spaces');

      return;
    }

    setErrorMessage('');
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
            'is-danger': errorMessage !== '',
          })}
          placeholder={placeholder}
          value={value}
          onChange={event => onChange(event.target.value)}
          onBlur={() => handleError()}
        />
      </div>

      {errorMessage !== '' && <p className="help is-danger">{errorMessage}</p>}

    </div>
  );
};
