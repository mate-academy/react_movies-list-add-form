import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  name: string;
  value: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  pattern?: RegExp;
  onChange?: (value: React.ChangeEvent<HTMLInputElement>) => void;
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
  pattern,
  onChange = () => {},
}) => {
  // generate a unique id once on component load
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  // To show errors only if the field was touched (onBlur)
  const [touched, setTouched] = useState(false);
  const hasError = touched && required && !value;
  const [errorMessage, setErrorMessage] = useState(`${label} is required`);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newItem = event.target.value;

    if (pattern) {
      if (!pattern.test(newItem)) {
        setErrorMessage(`You should write a link to the ${label}`);

        return;
      }
    }

    onChange(event);
  };

  return (
    <div className="field">
      <label className="label" htmlFor={id}>
        {label}
      </label>

      <div className="control">
        <input
          name={name}
          type="text"
          id={id}
          data-cy={`movie-${name}`}
          className={classNames('input', {
            'is-danger': hasError,
          })}
          placeholder={placeholder}
          defaultValue={value}
          onChange={handleTitleChange}
          onBlur={() => setTouched(true)}
        />
      </div>

      {hasError && <p className="help is-danger">{errorMessage}</p>}
    </div>
  );
};
