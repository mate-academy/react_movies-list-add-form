import classNames from 'classnames';
import React, { ChangeEvent, memo, useState } from 'react';

type Props = {
  name: string;
  value: string;
  setNewValue: (newValue: string) => void;
  isFormatValid?: boolean;
  setIsFormatValid?: (newValue: boolean) => void;
  label?: string;
  required?: boolean;
  isFieldValidCustom?: (newValue: string) => boolean;
};

function getRandomDigits() {
  return Math.random().toString().slice(2);
}

export const TextField: React.FC<Props> = memo(({
  name,
  value,
  setNewValue,
  isFormatValid = true,
  setIsFormatValid = () => {},
  label = name,
  required = false,
  isFieldValidCustom = () => true,
}) => {
  const [id] = useState(() => `${name}-${getRandomDigits()}`);
  const [touched, setTouched] = useState(false);
  const [isFormatChanged, setIsFormatChanged] = useState(false);

  const hasError = touched && required && !value.trim();

  function onBlur(): void {
    setTouched(true);

    const isFieldValid = isFieldValidCustom(value);

    setIsFormatValid(isFieldValid);
    setIsFormatChanged(false);
  }

  function onChange(event: ChangeEvent<HTMLInputElement>): void {
    const newValue = event.target.value;

    setNewValue(newValue);
    setIsFormatChanged(true);
    setIsFormatValid(false);
  }

  return (
    <div className="field">
      <label className="label" htmlFor={id}>
        {label}
      </label>

      <div className="control">
        <input
          id={id}
          data-cy={`movie-${name}`}
          className={classNames(
            'input',
            {
              'is-danger': hasError || (!isFormatValid && !isFormatChanged),
            },
          )}
          type="text"
          placeholder={`Enter ${label}`}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
        />
      </div>

      {hasError && (
        <p className="help is-danger">
          {`${label} is required`}
        </p>
      )}

      {(!isFormatValid && !hasError && !isFormatChanged) && (
        <p className="help is-danger">
          {`${label} format is not valid`}
        </p>
      )}
    </div>
  );
});
