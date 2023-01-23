import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  name: string,
  value: string,
  label: string,
  required?: boolean,
  isImgUrlValid?: boolean,
  isImbdUrlValid?: boolean,
  onChange: (newValue: string) => void,
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
  required = false,
  isImbdUrlValid,
  isImgUrlValid,
  setIsImdbUrlValid,
  setIsImgUrlValid,
  onChange = () => {},
}) => {
  // generage a unique id once on component load
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  // To show errors only if the field was touched (onBlur)
  const [touched, setToched] = useState(false);

  const hasInvalidValue = (isImgUrlValid === false)
    || (isImbdUrlValid === false);
  const hasError = (touched && required && !value) || hasInvalidValue;

  const handleChange = (event:React.FormEvent<HTMLInputElement>) => {
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
        <p className="help is-danger">
          {
            hasInvalidValue
              ? 'Invalid URL'
              : `${label} is required`
          }
        </p>
      )}
    </div>
  );
};
