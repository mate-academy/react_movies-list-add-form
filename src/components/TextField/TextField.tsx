import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  name: string;
  value: string;
  label?: string;
  placeholder?: string;
  validation?: boolean;
  required?: boolean;
  onChange?: (name: string, value: string) => void;
  handleValidate?: (newValue: boolean) => void;
};

/* eslint-disable */
const pattern =
  /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

function getRandomDigits() {
  return Math.random().toFixed(16).slice(2);
}

export const TextField: React.FC<Props> = ({
  name,
  value,
  label = name,
  placeholder = `Enter ${label}`,
  required = false,
  validation = false,
  onChange = () => {},
  handleValidate = () => {},
}) => {
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  const [touched, setTouched] = useState(false);
  const [valid, setValid] = useState(validation);
  const hasError = touched && required && !value;

  const handleOnBlur = () => {
    setTouched(true);

    if ((name === 'imgUrl' || name === 'imdbUrl') && value) {
      const newValid = !pattern.test(value);
      handleValidate(newValid);
      setValid(newValid);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    onChange(name, value);
  }

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
            'is-danger': hasError || valid,
          })}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onBlur={handleOnBlur}
        />
      </div>

      {hasError && <p className="help is-danger">{`${label} is required`}</p>}
      {valid && <p className="help is-danger">{`${label} is not valid`}</p>}
    </div>
  );
};
