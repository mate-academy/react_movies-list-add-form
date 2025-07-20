import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  name: string;
  value: string;
  label?: string;
  placeholder?: string;
  onBlur?: () => void;
  required?: boolean;
  onChange?: (newValue: string) => void;
  error?: boolean;
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
  error = false,
}) => {
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

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
            'is-danger': error,
          })}
          placeholder={placeholder}
          value={value}
          onChange={event => onChange(event.target.value)}
          onBlur={onBlur}
        />
      </div>

      {error && <p className="help is-danger">{`${label} is required`}</p>}
    </div>
  );
};
