import classNames from 'classnames';
import React, { useState, ChangeEvent } from 'react';

import { validateField } from '../../services/validateField';

type ValidError = {
  [key: string]: boolean;
  title: boolean;
  imgUrl: boolean;
  imdbUrl: boolean;
  imdbId: boolean;
};

type Props = {
  name: string;
  value: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  onChange?: (newValue: string) => void;
  onBlur?: () => void;
  touched?: boolean;
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
  onBlur = () => {},
  touched,
}) => {
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  const hasError = touched && required && !value;
  const [validError, setValidError] = useState<ValidError>({
    title: false,
    imgUrl: false,
    imdbUrl: false,
    imdbId: false,
  });
  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
    validateField(
      name,
      value,
      validError,
      setValidError,
    );
  };

  const handleOnblur = () => {
    onBlur();
    validateField(
      name,
      value,
      validError,
      setValidError,
    );
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
            'is-danger': hasError,
          })}
          placeholder={placeholder}
          value={value}
          onChange={handleOnChange}
          onBlur={handleOnblur}
        />
      </div>

      {hasError && (
        <p className="help is-danger">{`${label} is required`}</p>
      )}

      { !hasError && validError[name] && (
        <p className="help is-danger">{`The ${label} is incorrect`}</p>
      )}
    </div>
  );
};
