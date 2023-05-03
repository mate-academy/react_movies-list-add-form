import React, { useState } from 'react';
import classNames from 'classnames';

type Props = {
  name: string,
  value: string,
  isInvalid?: boolean,
  setIsInvalid?: (newValue: boolean) => void,
  label?: string,
  required?: boolean,
  onChange?: (newValue: string) => void,
};

function getRandomDigits() {
  return Math.random().toString().slice(2);
}

export const TextField: React.FC<Props> = ({
  name,
  value,
  isInvalid,
  setIsInvalid,
  label = name,
  required = false,
  onChange = () => {},
}) => {
  // generage a unique id once on component load
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  // To show errors only if the field was touched (onBlur)
  const [touched, setToched] = useState(false);
  const hasError = touched && required && !value;

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (isInvalid && setIsInvalid) {
      setIsInvalid(false);
    }

    onChange(event.target.value);
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
          onChange={handleOnChange}
          onBlur={() => setToched(true)}
        />
      </div>

      {hasError && (
        <p className="help is-danger">{`${label} is required`}</p>
      )}
      {isInvalid && (
        <p className="help is-danger">Invalid data</p>
      )}
    </div>
  );
};
