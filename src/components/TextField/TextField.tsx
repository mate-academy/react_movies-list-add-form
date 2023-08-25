import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  name: string,
  value: string,
  label?: string,
  placeholder?: string,
  required?: boolean,
  validationPattern?: RegExp,
  onChange?: (name: string, newValue: string) => void,
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
  validationPattern,
  onChange = () => { },
}) => {
  const [id] = useState(() => `${name}-${getRandomDigits()}`);
  const [touched, setTouched] = useState(false);

  const trimmedValue = value.trim();

  const hasError = touched && (
    (required && !value.trim())
    || (validationPattern && !validationPattern.test(value.trim()))
  );

  const erorMessage = () => {
    if (!trimmedValue) {
      return `${label} is required`;
    }

    if (validationPattern && !validationPattern.test(trimmedValue)) {
      return `${label} is not a valid URL`;
    }

    return '';
  };

  const handleBlur = () => {
    onChange(name, value.trim());
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
            'is-danger': hasError,
          })}
          placeholder={placeholder}
          value={value}
          onChange={event => onChange(name, event.target.value)}
          onBlur={handleBlur}
        />
      </div>

      {hasError && (
        <p className="help is-danger">
          {erorMessage()}
        </p>
      )}
    </div>
  );
};
