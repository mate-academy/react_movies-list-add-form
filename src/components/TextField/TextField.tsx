import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  name: string;
  value: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  onChange?: (newValue: string) => void;
  validate?: (value: string) => boolean;
  validURL?: boolean;
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
  onChange = newValue => newValue,
  validURL = true,
}) => {
  // generage a unique id once on component load
  const [id] = useState(() => `${name}-${getRandomDigits()}`);
  const isEmpty = value.trim() === '';

  // To show errors only if the field was touched (onBlur)
  const [touched, setTouched] = useState(false);

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
            // 'is-danger': hasError || !validURL,
            'is-danger': (hasError || !validURL) && !isEmpty,
          })}
          placeholder={placeholder}
          value={value}
          onChange={event => onChange(event.target.value)}
          onBlur={() => setTouched(true)}
        />
      </div>
      {hasError && <p className="help is-danger">{`${label} is required`}</p>}
      {!validURL && !isEmpty && (
        <p className="help is-danger">{`${label} is not a valid URL`}</p>
      )}
    </div>
  );
};
