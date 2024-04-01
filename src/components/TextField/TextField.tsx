import classNames from 'classnames';
import React, { useState } from 'react';
import { MovieCustom } from '../NewMovie';

interface ValueType {
  value: string;
  touched: boolean;
}

type Props = {
  name: string;
  value: ValueType;
  label?: string;
  placeholder?: string;
  required?: boolean;
  onChange?: (newValue: string) => void;
  changeTouched: (key: keyof MovieCustom, touched: boolean) => void;
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
  onChange = () => {},
  changeTouched,
}) => {
  // generage a unique id once on component load
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  // To show errors only if the field was touched (onBlur)
  const hasError = value.touched && required && !value.value.trim();

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
          value={value.value}
          onChange={event => onChange(event.target.value)}
          onBlur={() => changeTouched(name as keyof MovieCustom, true)}
        />
      </div>

      {hasError && <p className="help is-danger">{`${label} is required`}</p>}
    </div>
  );
};
