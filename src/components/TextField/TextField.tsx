import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  name: string;
  value: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
  onChange?: (newValue: string, name: string) => void;
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
  error,
}) => {
  // generage a unique id once on component load
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  // To show errors only if the field was touched (onBlur)
  const [touched, setTouched] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const hasError = touched && required && errorMessage;

  function handleOnBlur(event: React.FocusEvent<HTMLInputElement>) {
    if (!event.target.value.trim()) {
      setErrorMessage('is required');
    } else if (error) {
      setErrorMessage(error);
    } else {
      setErrorMessage('');
    }

    setTouched(true);
  }

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
          onChange={event => {
            onChange(event.target.value, name);
          }}
          onBlur={handleOnBlur}
          onFocus={() => setTouched(false)}
        />
      </div>

      {hasError && (
        <p className="help is-danger">{`${label} ${errorMessage}`}</p>
      )}
    </div>
  );
};
