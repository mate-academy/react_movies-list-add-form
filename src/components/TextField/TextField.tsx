import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  name: string;
  value: string | undefined;
  label?: string;
  placeholder?: string;
  required?: boolean;
  onChange?: (newValue: React.ChangeEvent<HTMLInputElement>) => void;
};

function getRandomDigits() {
  return Math.random().toFixed(16).slice(2);
}

const isValidUrl = (url: string) => {
  const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;

  return urlPattern.test(url);
};

export const TextField: React.FC<Props> = ({
  name,
  value,
  label = name,
  placeholder = `Enter ${label}`,
  required = false,
  onChange = () => {},
}) => {
  const [id] = useState(() => `${name}-${getRandomDigits()}`);
  const [touched, setTouched] = useState(false);
  const isImgUrl = name === 'imgUrl';
  const isImdbUrl = name === 'imdbUrl';
  const hasError = touched && required && !value;
  const isNotUrl =
    (isImgUrl || isImdbUrl) && touched && value && !isValidUrl(value);

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
            'is-danger': hasError || isNotUrl,
          })}
          placeholder={placeholder}
          value={value}
          onChange={event => onChange(event)}
          onBlur={() => setTouched(true)}
        />
      </div>

      {hasError && label !== 'description' && (
        <p className="help is-danger">{`${label} is required`}</p>
      )}
      {isNotUrl && (
        <p className="help is-danger">{`${label} is not a valid URL`}</p>
      )}
    </div>
  );
};
