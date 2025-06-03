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
  'data-cy'?: string;
  error?: string;
};

function getRandomDigits() {
  return Math.random().toFixed(16).slice(2);
}

export const TextField: React.FC<Props> = ({
  name,
  label,
  value,
  onChange,
  required,
  placeholder,
  onBlur,
  'data-cy': dataCy,
}) => {
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

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
          data-cy={dataCy || `movie-${name}`}
          className={classNames('input', {
            'is-danger': hasError,
          })}
          placeholder={placeholder}
          value={value}
          onChange={event => onChange && onChange(event.target.value)}
          onBlur={() => {
            setTouched(true);
            if (onBlur) {
              onBlur();
            }
          }}
        />
      </div>

      {hasError && <p className="help is-danger">{`${label} is required`}</p>}
    </div>
  );
};
