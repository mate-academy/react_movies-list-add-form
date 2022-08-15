import React, { useState } from 'react';
import cn from 'classnames';
import { Movie } from '../../types/Movie';

type Props = {
  name: keyof Movie,
  value: string,
  label?: string,
  required?: boolean,
  onChange?: (newValue: string, name: keyof Movie) => void,
};

function getRandomDigits() {
  return Math.random().toString().slice(2);
}

export const TextField: React.FC<Props> = ({
  name,
  value,
  label = name,
  required = false,
  onChange = () => {},
}) => {
  const [id] = useState(
    () => `${name}-${getRandomDigits()}`,
  );

  const [touched, setToched] = useState(false);
  const hasError = touched && required && !value;

  return (
    <div className="field">
      <label className="label" htmlFor={id}>
        {label}
      </label>

      <div className="control">
        <input
          id={id}
          data-cy={`movie-${name}`}
          className={cn('input', {
            'is-danger': hasError,
          })}
          type="text"
          placeholder={`Enter ${label}`}
          value={value}
          onChange={event => (
            onChange(event.target.value, name)
          )}
          onBlur={() => setToched(true)}
        />
      </div>

      {hasError && (
        <p className="help is-danger">
          {`${label} is required`}
        </p>
      )}
    </div>
  );
};
