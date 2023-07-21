import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  name: string,
  value: string,
  label?: string,
  placeholder?: string,
  required?: boolean,
  onChange?: (newValue: string) => void,
  setIsValidImg: (newValue: boolean) => void,
  setIsValidImdb: (newValue: boolean) => void,
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
  onChange = () => {},
  setIsValidImg,
  setIsValidImdb,

}) => {
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  const [hasError, setHasError] = useState(false);
  const [hasUrlError, setHasUrlError] = useState(false);

  const pattern = new RegExp(
    /^([A-Za-z]{3,9}:(?:\/\/)?)/.source
    + /(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|/.source
    + /(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+/.source
    + /(?:\/[+~%/.\w-_]*)?\??/.source
    + /(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*)?$/.source,
  );

  const handleChange = (newValue: string) => {
    const isValidInput = pattern.test(newValue);

    if (name === 'imgUrl') {
      setIsValidImg(isValidInput);
    }

    if (name === 'imdbUrl') {
      setIsValidImdb(isValidInput);
    }

    if (!isValidInput && newValue
      && (name === 'imgUrl' || name === 'imdbUrl')) {
      setHasUrlError(true);
    } else {
      setHasUrlError(false);
    }

    onChange(newValue);
  };

  const handleBlur = () => {
    setHasError(required && !value.trim());
  };

  const handleFocus = () => {
    setHasError(false);
    setHasUrlError(false);
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
            'is-danger': hasError || hasUrlError,
          })}
          placeholder={placeholder}
          value={value}
          onChange={event => handleChange(event.target.value)}
          onBlur={handleBlur}
          onFocus={handleFocus}
        />
      </div>

      {hasError && (
        <p className="help is-danger">{`${label} is required`}</p>
      )}
      {hasUrlError && (
        <p className="help is-danger">{`${label} is not valid`}</p>
      )}
    </div>
  );
};
