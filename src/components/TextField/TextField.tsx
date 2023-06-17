import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  name: string,
  value: string,
  label?: string,
  required?: boolean,
  pattern?: RegExp
  onChange?: (newValue: string) => void,
};

function getRandomDigits() {
  return Math.random().toString().slice(2);
}

function isValidByPattern(
  value: string,
  pattern: RegExp | undefined,
) {
  if (!pattern) {
    return true;
  }

  return value.length === value.replaceAll(pattern, '').length;
}

export const TextField: React.FC<Props> = ({
  name,
  value,
  label = name,
  required = false,
  pattern,
  onChange = () => {},
}) => {
  // generage a unique id once on component load
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  // To show errors only if the field was touched (onBlur)
  const [touched, setTouched] = useState(false);

  const hasError = touched && required && !value;

  const changed = (newValue: string) => {
    if (pattern && !isValidByPattern(newValue, pattern)) {
      return;
    }

    onChange(newValue);
  };

  return (
    <div className="field">
      <label className="label" htmlFor={id}>
        {label}
      </label>

      <div className="control">
        <input
          id={id}
          data-cy={`movie-${name}`}
          className={classNames('input', {
            'is-danger': hasError,
          })}
          type="text"
          placeholder={`Enter ${label}`}
          value={value}
          onChange={event => changed(event.target.value)}
          onBlur={() => setTouched(true)}
        />
      </div>

      {hasError && (
        <p className="help is-danger">{`${label} is required`}</p>
      )}
    </div>
  );
};
