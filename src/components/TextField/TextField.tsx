import classNames from 'classnames';
import React, { FC, ChangeEvent, useState } from 'react';

interface Props {
  name: string;
  value: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  isTextArea?: boolean;
  validate?: (value: string) => string;
  onChange?: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
}

function getRandomDigits() {
  return Math.random().toFixed(16).slice(2);
}

export const TextField: FC<Props> = ({
  name,
  value,
  label = name,
  placeholder = `Enter ${label}`,
  required = false,
  isTextArea = false,
  validate,
  onChange = () => {},
}) => {
  const [id] = useState(() => `${name}-${getRandomDigits()}`);
  const [touched, setTouched] = useState(false);

  const errorMessage = touched
    ? required && !value.trim()
      ? `${label} is required`
      : validate && value.trim()
        ? validate(value)
        : ''
    : '';

  return (
    <div className="field">
      <label className="label" htmlFor={id}>
        {label}
      </label>
      <div className="control">
        {isTextArea ? (
          <textarea
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={() => setTouched(true)}
            className={classNames('textarea', {
              'is-danger': !!errorMessage,
            })}
            placeholder={placeholder}
            data-cy={`movie-${name}`}
          />
        ) : (
          <input
            type="text"
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={() => setTouched(true)}
            className={classNames('input', {
              'is-danger': !!errorMessage,
            })}
            placeholder={placeholder}
            data-cy={`movie-${name}`}
          />
        )}
      </div>
      {errorMessage && <p className="help is-danger">{errorMessage}</p>}
    </div>
  );
};
