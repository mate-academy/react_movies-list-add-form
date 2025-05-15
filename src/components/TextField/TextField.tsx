import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  name: string;
  value: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setDisabled: (arg: boolean) => void;
  validate: (name: string, value: string) => string | null;
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
  setDisabled,
  validate,
}) => {
  // generate a unique id once on component load
  const [id] = useState(() => `${name}-${getRandomDigits()}`);
  const validationMessage = validate(name, value);

  // To show errors only if the field was touched (onBlur)
  const [touched, setTouched] = useState(false);
  const hasError = touched && Boolean(validationMessage);
  // const isRequired = required === true && value.length > 0;

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
          onChange={onChange}
          onBlur={() => {
            setTouched(true);
            {
              // eslint-disable-next-line @typescript-eslint/no-unused-expressions
              setDisabled(validationMessage === null && false);
            }
          }}
        />
      </div>
      {hasError && <p className="help is-danger">{validationMessage}</p>}
    </div>
  );
};
