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
  validate = () => '',
}) => {
  // generate a unique id once on component load
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  // To show errors only if the field was touched (onBlur)
  const [touched, setTouched] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const hasError = touched && ((required && !value) || errorMessage);

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage('');
    onChange(event.target.value);
  };

  const handleTextBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTouched(true);

    const newValue = event.target.value;

    if (newValue) {
      setErrorMessage(validate(newValue));
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
          onChange={handleTextChange}
          onBlur={handleTextBlur}
        />
      </div>

      {hasError && (
        <p className="help is-danger">
          {errorMessage || `${label} is required`}
        </p>
      )}
    </div>
  );
};
