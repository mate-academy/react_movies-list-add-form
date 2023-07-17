import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  name: string,
  value: string,
  label?: string,
  placeholder?: string,
  required?: boolean,
  onChange?: (newValue: string) => void,
  validation?: (value: string) => boolean,
  setIsImgUrlError?: React.Dispatch<React.SetStateAction<boolean>>,
  setIsImdbUrlError?: React.Dispatch<React.SetStateAction<boolean>>,
};

function getRandomDigits() {
  return Math.random()
    .toFixed(16)
    .slice(2);
}

export const TextField: React.FC<Props> = ({
  name,
  value,
  label = name,
  placeholder = `Enter ${label}`,
  required = false,
  onChange = () => { },
  validation,
  setIsImgUrlError,
  setIsImdbUrlError,
}) => {
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  const [touched, setTouched] = useState(false);
  const [validationError, setValidationError] = useState(false);
  const hasError = touched && required && !value;

  const handlerInputChange = (eventValue: string) => {
    onChange(eventValue);

    if (validation) {
      if (name === 'imgUrl' && setIsImgUrlError) {
        setIsImgUrlError(!validation(eventValue));
      }

      if (name === 'imdbUrl' && setIsImdbUrlError) {
        setIsImdbUrlError(!validation(eventValue));
      }

      setValidationError(!validation(eventValue));
    }
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
          data-cy={`movie-${name}`}
          className={classNames('input', {
            'is-danger': hasError || (touched && validationError),
          })}
          placeholder={placeholder}
          value={value}
          onChange={event => handlerInputChange(event.target.value)}
          onBlur={() => setTouched(true)}
        />
      </div>

      {hasError && (
        <p className="help is-danger">{`${label} is required`}</p>
      )}

      {touched && validationError && (
        <p className="help is-danger">Url is incorrect</p>
      )}
    </div>
  );
};
