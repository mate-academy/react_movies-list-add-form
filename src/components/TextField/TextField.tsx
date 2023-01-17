import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  name: string,
  value: string,
  label: string,
  required?: boolean,
  onChange: (newValue: string) => void,
  isImgUrlValid?: boolean,
  isImdbUrlValid?: boolean,
  setIsImgUrlValid?: (newValue: boolean) => void,
  setIsImdbUrlValid?: (newValue: boolean) => void,
};

function getRandomDigits() {
  return Math.random().toString().slice(2);
}

export const TextField: React.FC<Props> = ({
  name,
  value,
  label = name,
  isImgUrlValid,
  isImdbUrlValid,
  setIsImgUrlValid,
  setIsImdbUrlValid,
  required = false,
  onChange = () => {},
}) => {
  // generage a unique id once on component load
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  // To show errors only if the field was touched (onBlur)
  const [touched, setToched] = useState(false);

  const invalidValue = (isImgUrlValid === false)
    || (isImdbUrlValid === false);

  const hasError = (touched && required && !value) || invalidValue;

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    if (setIsImgUrlValid !== undefined) {
      setIsImgUrlValid(true);
    }

    if (setIsImdbUrlValid !== undefined) {
      setIsImdbUrlValid(true);
    }

    onChange(event.currentTarget.value);
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
        <p className="help is-danger">{`${label} is required`}</p>
      )}

      {(invalidValue) && (
        <p className="help is-danger">Enter valid URL</p>
      )}
    </div>
  );
};
