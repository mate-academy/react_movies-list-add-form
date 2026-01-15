import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  name: string;
  value: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  onChange?: (newValue: string) => void;
  validateValue?: (value: string) => boolean;
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
  validateValue = valueToCheck => valueToCheck.trim().length > 0,
}) => {
  // generate a unique id once on component load
  const [id] = useState(() => `${name}-${getRandomDigits()}`);
  const [touched, setTouched] = useState(false);

  const hasError = touched && required && !validateValue(value.trim());

  const handleOnBlur = () => {
    setTouched(true);
    onChange(value.trim());
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
          onChange={event => onChange(event.target.value)}
          onBlur={handleOnBlur}
        />
      </div>

      {hasError && <p className="help is-danger">{`${label} is required`}</p>}
    </div>
  );
};
