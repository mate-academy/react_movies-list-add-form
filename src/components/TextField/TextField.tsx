import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  name: string;
  value: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  onChange?: (newValue: string) => void;
  validateUrl?: (value: string) => boolean;
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
  validateUrl = () => true,
}) => {
  const [id] = useState(() => `${name}-${getRandomDigits()}`);
  const [touched, setTouched] = useState(false);
  const [errorMessage, setErrorMessage] = useState(`${label} is required`);

  const isUrlValid = validateUrl(value);
  const isUrlInputNOTEmpty = (name === 'imgUrl' || name === 'imdbUrl') && value;
  const hasRequiredError = touched && required && !value;
  const hasInvalidError = touched && value && !isUrlValid;

  const handleOnBlur = () => {
    if (isUrlInputNOTEmpty && !isUrlValid) {
      setErrorMessage('Invalid URL');
    } else {
      setErrorMessage(`${label} is required`);
    }

    setTouched(true);
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
            'is-danger': hasRequiredError || hasInvalidError,
          })}
          placeholder={placeholder}
          value={value}
          onChange={(event) => {
            const newValue = event.target.value;

            onChange(newValue);
          }}
          onBlur={handleOnBlur}
        />
      </div>

      {(hasRequiredError || hasInvalidError) && (
        <p className="help is-danger">{errorMessage}</p>
      )}
    </div>
  );
};
