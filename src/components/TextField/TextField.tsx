import classNames from 'classnames';
import React, { useState } from 'react';

export type Props = {
  name: string;
  value: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  onChange?: (newValue: string) => void;
};

function getRandomDigits(): string {
  return Math.random().toFixed(16).slice(2);
}

export const TextField: React.FC<Props> = props => {
  const {
    name,
    value,
    label = name,
    placeholder = `Enter ${label}`,
    required = false,
    onChange,
  } = props;

  const [id] = useState<string>(() => `${name}-${getRandomDigits()}`);
  const [touched, setTouched] = useState<boolean>(false);
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
          onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
            if (onChange) {
              onChange(event.target.value);
            }
          }}
          onBlur={(): void => setTouched(true)}
        />
      </div>

      {hasError && <p className="help is-danger">{`${label} is required`}</p>}
    </div>
  );
};
