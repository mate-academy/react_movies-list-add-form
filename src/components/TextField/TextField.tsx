import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { MovieField } from '../../types/Movie';

type Props = {
  name: string,
  value: string,
  label?: string,
  placeholder?: string,
  required?: boolean,
  onChange?: (newValue: string) => void,
  count: number,
  setCount: (value: number) => void,
  isValidImgUrl?: boolean,
  isValidImdbUrl?: boolean,
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
  count,
  setCount,
  isValidImgUrl,
  isValidImdbUrl,
}) => {
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  const [touched, setTouched] = useState(false);

  const checkCount = () => {
    if (count > 0) {
      setTouched(false);
      setCount(0);
    }
  };

  useEffect(() => {
    checkCount();
  }, [count]);

  const hasError = touched && required && !value;
  const hasInvalidImgUrl = touched && required
    && value && !isValidImgUrl && (name === MovieField.ImgUrl);
  const hasInvalidImdbUrl = touched && required
    && value && !isValidImdbUrl && (name === MovieField.ImdbUrl);

  const shouldAddDangerClass = hasError
    || hasInvalidImgUrl || hasInvalidImdbUrl;

  const inputClassName = classNames('input', {
    'is-danger': shouldAddDangerClass,
  });

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
          className={inputClassName}
          placeholder={placeholder}
          value={value}
          onChange={event => onChange(event.target.value)}
          onBlur={() => setTouched(true)}
        />
      </div>

      {hasError && (
        <p className="help is-danger">{`${label} is required`}</p>
      )}

      {hasInvalidImgUrl && (
        <p className="help is-danger">{`${name} is invalid`}</p>
      )}

      {hasInvalidImdbUrl && (
        <p className="help is-danger">{`${name} is invalid`}</p>
      )}
    </div>
  );
};
