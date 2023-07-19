import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  name: string,
  value: string,
  label?: string,
  placeholder?: string,
  required?: boolean,
  onChange?: (newValue: string) => void,
  setValidImg: (newValue: boolean) => void,
  setValidImdb: (newValue: boolean) => void,
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
  setValidImg,
  setValidImdb,

}) => {
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  const [touched, setTouched] = useState(false);
  const hasError = touched && required && !value;
  let hasUrlError = false;

  const pattern = new RegExp(
    /^([A-Za-z]{3,9}:(?:\/\/)?)/.source
    + /(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|/.source
    + /(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+/.source
    + /(?:\/[+~%/.\w-_]*)?\??/.source
    + /(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*)?$/.source,
  );

  let isValidInput = pattern.test(value);

  if (!isValidInput && value && (name === 'imgUrl' || name === 'imdbUrl')) {
    hasUrlError = true;
  }

  const handleChange = (newValue: string) => {
    isValidInput = pattern.test(newValue);

    if (!isValidInput && newValue && name === 'imgUrl') {
      setValidImg(false);
    }

    if (!isValidInput && newValue && name === 'imdbUrl') {
      setValidImdb(false);
    }

    if (isValidInput && newValue && name === 'imgUrl') {
      setValidImg(true);
    }

    if (isValidInput && newValue && name === 'imdbUrl') {
      setValidImdb(true);
    }

    onChange(newValue);
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
          onBlur={() => setTouched(true)}
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
