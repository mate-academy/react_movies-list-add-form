import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  inputName: string;
  inputValue: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  onChange?: (name: string, value: string) => void;
};

function getRandomDigits() {
  return Math.random().toFixed(16).slice(2);
}

export const TextField: React.FC<Props> = ({
  inputName,
  inputValue,
  label = inputName,
  placeholder = `Enter ${label}`,
  required = false,
  onChange = () => {},
}) => {
  const [id] = useState(() => `${inputName}-${getRandomDigits()}`);

  const [touched, setTouched] = useState(false);
  const hasError = touched && required && !inputValue;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    onChange(name, value);
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
          name={inputName}
          data-cy={`movie-${inputName}`}
          className={classNames('input', {
            'is-danger': hasError,
          })}
          placeholder={placeholder}
          value={inputValue}
          onChange={handleChange}
          onBlur={() => setTouched(true)}
        />
      </div>

      {hasError && <p className="help is-danger">{`${label} is required`}</p>}
    </div>
  );
};
