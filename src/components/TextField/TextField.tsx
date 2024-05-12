import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  isTouched: boolean;
  name: string;
  value: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  onChange?: (newValue: string) => void;
  checkUrl?: (url: string) => boolean;
};

function getRandomDigits() {
  return Math.random().toFixed(16).slice(2);
}

export const TextField: React.FC<Props> = ({
  isTouched,
  name,
  value,
  label = name,
  placeholder = `Enter ${label}`,
  required = false,
  onChange = () => {},
  checkUrl = () => {},
}) => {
  // generate a unique id once on component load
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  const labelIsUrl = (input: string) => {
    if (input === 'Image URL' || input === 'Imdb URL') {
      return true;
    }

    return false;
  };

  // To show errors only if the field was touched (onBlur)
  const [touched, setTouched] = useState(isTouched);
  const hasError = touched && required && !value;
  const [isValidUrl, setIsValidUrl] = useState(true);
  const hasUrlError = !isValidUrl && labelIsUrl(label) && value;

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
          onChange={event => {
            onChange(event.target.value);
          }}
          onBlur={event => {
            if (!checkUrl(event.target.value)) {
              setIsValidUrl(false);
            } else {
              setIsValidUrl(true);
            }

            setTouched(true);
          }}
        />
      </div>

      {hasError && <p className="help is-danger">{`${label} is required`}</p>}

      {hasUrlError && (
        <p className="help is-danger">Please, enter valid link</p>
      )}
    </div>
  );
};
