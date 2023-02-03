import classNames from 'classnames';
import React, { FC, ChangeEvent, useState } from 'react';

type Props = {
  name: string,
  value: string,
  label?: string,
  required?: boolean,
  setValue?: (newValue: string) => void,
  validate?: (value: string) => void,
  valid?: boolean,
};

function getRandomDigits() {
  return Math.random().toString().slice(2);
}

export const TextField: FC<Props> = React.memo(
  ({
    name,
    value,
    label = name,
    required = false,
    setValue = () => {},
    validate = () => true,
    valid = true,
  }) => {
    const [id] = useState(() => `${name}-${getRandomDigits()}`);

    const [touched, setTouched] = useState(false);

    const hasIsRequiredError = touched && required && !value;
    const hasIsInvalidError = !valid && value;
    const hasError = hasIsRequiredError || hasIsInvalidError;

    const handleChange = (event : ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;

      setValue(newValue);
      validate(newValue);
    };

    return (
      <div className="field">
        <label className="label" htmlFor={id}>
          {label}
        </label>

        <div className="control">
          <input
            id={id}
            data-cy={`movie-${name}`}
            className={classNames('input', {
              'is-danger': hasError,
            })}
            type="text"
            placeholder={`Enter ${label}`}
            value={value}
            onChange={handleChange}
            onBlur={() => setTouched(true)}
          />
        </div>

        {hasIsRequiredError && (
          <p className="help is-danger">
            {`${label} is required`}
          </p>
        )}

        {hasIsInvalidError && (
          <p className="help is-danger">
            {`${label} isn't valid`}
          </p>
        )}
      </div>
    );
  },
);
