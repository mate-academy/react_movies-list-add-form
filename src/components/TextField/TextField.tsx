import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  name: string;
  value: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  urlValidation?: boolean;
  onChange?: (newValue: React.ChangeEvent<HTMLInputElement>) => void;
};

function getRandomDigits() {
  return Math.random().toFixed(16).slice(2);
}

export const TextField: React.FC<Props> = ({
  name,
  value,
  label = name,
  placeholder = `Enter ${label}`,
  required = false,
  urlValidation,
  onChange = () => {},
}) => {
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  const [touched, setTouched] = useState(false);
  const hasError =
    (touched && required && !value) ||
    (touched && required && value.trim().length === 0 && value.length > 0);

  const isValidImgUrl =
    (name === 'imgUrl' || name === 'imdbUrl') && !urlValidation && !hasError;

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
            'is-danger': hasError || isValidImgUrl,
          })}
          placeholder={placeholder}
          value={value}
          onChange={e => onChange(e)}
          onBlur={() => setTouched(true)}
        />
      </div>

      {(hasError || isValidImgUrl) && (
        <p className="help is-danger">{`${isValidImgUrl ? 'Incorrect Url' : ''} ${hasError ? `${label} is required` : ''}`}</p>
      )}
    </div>
  );
};
