import classNames from 'classnames';
import React, { useState } from 'react';

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

/* eslint max-len: ["error", { "ignoreRegExpLiterals": true }] */

const validateUrl = (url: string) => {
  const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

  return pattern.test(url);
};

export const TextField: React.FC<Props> = ({
  name,
  value,
  label = name,
  placeholder = `Enter ${label}`,
  required = false,
  onChange = () => {},
}) => {
  // generage a unique id once on component load
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  // To show errors only if the field was touched (onBlur)
  const [touched, setTouched] = useState(false);
  const hasError = touched && required && !value;
  const [urlError, setUrlError] = useState(false);

  const onBlurHandler = (event: React.FocusEvent<HTMLInputElement>) => {
    setTouched(true);
    if (required && !value) {
      return;
    }

    if (name === 'imgUrl' || name === 'imdbUrl') {
      const isValidUrl = validateUrl(event.target.value);

      setUrlError(!isValidUrl);
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
            'is-danger': hasError || urlError,
          })}
          placeholder={placeholder}
          value={value}
          onChange={event => onChange(event.target.value)}
          onBlur={event => onBlurHandler(event)}
        />
      </div>

      {(hasError || urlError) && (
        <p className="help is-danger">
          {
            urlError ? 'Invalid URL format' : `${label} is required`
          }
        </p>
      )}
    </div>
  );
};
