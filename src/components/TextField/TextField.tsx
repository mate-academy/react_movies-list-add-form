import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  name: string,
  value: string,
  label?: string,
  required?: boolean,
  onChange?: (newValue: string) => void,
  validate?: (newValue: string) => boolean,
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
  validate = () => true,
}) => {
  const [id] = useState(() => `${name}-${getRandomDigits()}`);
  const [touched, setToched] = useState(false);
  const [isInputValid, setIsInputValid] = useState<boolean>(true);
  const hasError = touched
    && required
    && (!value.trim() || !isInputValid);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value: inputValue } = event.target;

    onChange(inputValue);
    setIsInputValid(validate(inputValue));
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
          onBlur={() => setToched(true)}
        />
      </div>

      {hasError && (
        <p className="help is-danger">
          {!isInputValid
            ? `${label} is invalid`
            : `${label} is required`}
        </p>
      )}
    </div>
  );
};
