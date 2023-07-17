import classNames from 'classnames';
import React, { useState } from 'react';
import { checkIsValidUrl } from '../../services/movie';

type Props = {
  name: string,
  value: string,
  label?: string,
  placeholder?: string,
  required?: boolean,
  onChange?: (newValue: string) => void,
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

  const [touched, setTouched] = useState(false);
  const [hasUrlError, setHasUrlError] = useState(false);
  const hasError = touched && required && !value;

  function checkUrlValidation(newValue: string) {
    const isValidUrl = checkIsValidUrl(newValue);

    setHasUrlError(() => !isValidUrl);
  }

  const handleFieldBlur = () => {
    if (name === 'imgUrl' || name === 'imdbUrl') {
      checkUrlValidation(value);
    }

    onChange(value.trim());
    setTouched(true);
  };

  const handleFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);

    if (touched && (name === 'imgUrl' || name === 'imdbUrl')) {
      checkUrlValidation(event.target.value);
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
          onChange={handleFieldChange}
          onBlur={handleFieldBlur}
        />
      </div>

      {hasError && (
        <p className="help is-danger">{`${label} is required`}</p>
      )}

      {hasUrlError && !hasError && (
        <p className="help is-danger">The URL is invalid</p>
      )}
    </div>
  );
};
