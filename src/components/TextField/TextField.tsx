import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  name: string;
  value: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  onChange?: (newValue: string) => void;
  onBlur?: () => void;
  isErrorMessage?: boolean;
  requiredErrorMessage?: string;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
};

function getRandomDigits() {
  return Math.random().toFixed(16).slice(2);
}

export const TextField: React.FC<Props> = ({
  name,
  value,
  label = name,
  placeholder = `Enter ${label}`,
  onChange = () => {},
  onBlur = () => {},
  isErrorMessage = false,
  requiredErrorMessage = `${label} is required`,
  inputProps = {},
}) => {
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  const [touched, setTouched] = useState(false);

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
            'is-danger': isErrorMessage && touched,
          })}
          placeholder={placeholder}
          value={value}
          onChange={event => onChange(event.target.value)}
          onBlur={() => {
            setTouched(true);
            onBlur();
          }}
          {...inputProps}
        />
      </div>

      {touched && isErrorMessage && (
        <p className="help is-danger">{requiredErrorMessage}</p>
      )}
    </div>
  );
};
