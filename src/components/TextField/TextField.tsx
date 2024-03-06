import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  required?: boolean;
};

function getRandomDigits() {
  return Math.random().toFixed(16).slice(2);
}

function validateUrl(url: string) {
  const pattern =
    // eslint-disable-next-line max-len
    /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

  return url.match(pattern);
}

export const TextField: React.FC<Props> = ({
  name,
  value,
  onChange,
  label = name,
  placeholder = `Enter ${label}`,
  required = false,
}) => {
  // generage a unique id once on component load
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  // To show errors only if the field was touched (onBlur)
  const [touched, setTouched] = useState(false);
  const [urlError, setUrlError] = useState(false);
  const hasError = touched && required && !value;

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setTouched(true);

    if (required && !value) {
      return;
    }

    if (name === 'imgUrl' || name === 'imdbUrl') {
      const isValidUrl = validateUrl(e.target.value);

      setUrlError(!isValidUrl);
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
          name={name}
          data-cy={`movie-${name}`}
          className={classNames('input', {
            'is-danger': hasError || urlError,
          })}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={handleBlur}
        />
      </div>

      {(hasError || urlError) && (
        <p className="help is-danger">{`${label} is required`}</p>
      )}
    </div>
  );
};
