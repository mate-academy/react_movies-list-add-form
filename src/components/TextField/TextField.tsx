import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  name: string;
  value: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  onChange?: (newValue: string) => void;
  extraValidation?: (newValue: string) => string;
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
  extraValidation = () => '',
}) => {
  // generate a unique id once on component load
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  // To show errors only if the field was touched (onBlur)
  const [touched, setTouched] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const hasError = touched && required && !value;

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
            onChange(event.target.value);
            setErrorMessage('');
          }}
          onBlur={event => {
            setTouched(true);

            const eventValue = event.target.value;

            if (!eventValue) {
              return;
            }

            const extraErrorMessage = extraValidation(eventValue);

            if (extraErrorMessage) {
              setErrorMessage(extraErrorMessage);
            } else {
              setErrorMessage('');
            }
          }}
        />
      </div>

      {hasError && <p className="help is-danger">{`${label} is required`}</p>}
      {errorMessage && <p className="help is-danger">{errorMessage}</p>}
    </div>
  );
};
