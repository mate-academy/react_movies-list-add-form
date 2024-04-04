import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  name: string;
  value: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  onChange: (newValue: string, name: string) => void;
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
  onChange,
}) => {
  const [id] = useState(() => `${name}-${getRandomDigits()}`);
  const [fieldValue, setFieldValue] = useState(value);
  const [touched, setTouched] = useState(false);
  const [hasUrlError, setHasUrlError] = useState(false);

  const hasError = (touched && required && !fieldValue) || hasUrlError;

  const pattern = new RegExp(
    '^((([A-Za-z]{3,9}:(?:\\/\\/)?)(?:[-;:&=+$,\\w]+@)?[A-Za-z0-9.-]+' +
      '|(?:www\\.|[-;:&=+$,\\w]+@)[A-Za-z0-9.-]+)((?:\\/[+~%/.\\w-_]*)?' +
      '?\\??(?:[-+=&;%@,.\\w_]*)#?(?:[,.!/\\\\\\w]*))?)$',
  );

  const hendleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue(e.target.value);
    onChange(e.target.value, name);

    if (name === 'imgUrl' || name === 'imdbUrl') {
      if (!pattern.test(e.target.value) && required) {
        setHasUrlError(true);
      } else {
        setHasUrlError(false);
      }
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
          value={fieldValue}
          onChange={hendleChange}
          onBlur={() => setTouched(true)}
        />
      </div>

      {hasError && (
        <p className="help is-danger">
          {hasUrlError ? 'Invalid URL' : `${label} is required`}
        </p>
      )}
    </div>
  );
};
