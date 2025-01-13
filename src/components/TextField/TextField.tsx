import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  newName: string;
  newValue: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  onChange?: (name: string, newValue: string) => void;
};

function getRandomDigits() {
  return Math.random().toFixed(16).slice(2);
}

export const TextField: React.FC<Props> = ({
  newName,
  newValue,
  label = newName,
  placeholder = `Enter ${label}`,
  required = false,
  onChange = () => {},
}) => {
  const [id] = useState(() => `${newName}-${getRandomDigits()}`);
  const [touched, setTouched] = useState(false);
  const hasError = touched && required && !newValue;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    onChange(name, value);
  };

  return (
    <div className="field">
      <label className="label" htmlFor={id}>
        {label}
      </label>

      <div className="control">
        <input
          name={newName}
          type="text"
          id={id}
          data-cy={`movie-${newName}`}
          className={classNames('input', {
            'is-danger': hasError,
          })}
          placeholder={placeholder}
          value={newValue}
          onChange={handleChange}
          onBlur={() => setTouched(true)}
        />
      </div>

      {hasError && <p className="help is-danger">{`${label} is required`}</p>}
    </div>
  );
};
