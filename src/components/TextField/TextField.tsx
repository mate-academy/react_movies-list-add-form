import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  name: string,
  value: string,
  label?: string,
  placeholder?: string,
  required?: boolean,
  onChange?: (newValue: string) => void,
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
}) => {
  // generage a unique id once on component load
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  // eslint-disable-next-line max-len
  const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

  // To show errors only if the field was touched (onBlur)
  const [touched, setTouched] = useState(false);
  const [urlError, setUrlError] = useState(false);
  const hasError = touched && required && !value;

  const handleValidUrl = () => {
    if (required && !value) {
      setTouched(true);

      return;
    }

    if (name === 'imgUrl' || name === 'imdbUrl') {
      const validUrl = pattern.test(value);

      setUrlError(!validUrl);
    } else {
      setTouched(true);
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
            'is-danger': hasError || urlError,
          })}
          placeholder={placeholder}
          value={value}
          onChange={(event) => {
            onChange(event.target.value);
          }}
          onBlur={() => {
            handleValidUrl();
          }}
        />
      </div>

      {hasError && !urlError && (
        <p className="help is-danger">{`${label} is required`}</p>
      )}

      {urlError && (
        <p className="help is-danger">{`${label} is not valid`}</p>
      )}
    </div>
  );
};
