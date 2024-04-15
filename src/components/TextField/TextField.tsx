import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  name: string;
  value: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>, name: string) => void;
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
  onChange = () => {},
}) => {
  const [id] = useState(() => `${name}-${getRandomDigits()}`);
  const [touched, setTouched] = useState(false);
  const [validUrl, setValidUrl] = useState(true);
  const hasInvalid = validUrl;
  const hasError = touched && required && !value.trim() && hasInvalid;

  const testValidURL = (url: string) => {
    /* eslint-disable max-len */
    const pattern =
      /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

    if (pattern.test(url)) {
      setValidUrl(true);
    } else {
      setValidUrl(false);
    }
  };

  const onBlurFunc = (): boolean | void => {
    setTouched(true);

    if (label === 'Imdb URL' || label === 'Image URL') {
      testValidURL(value);
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
            'is-danger': hasError,
          })}
          placeholder={placeholder}
          value={value}
          onChange={event => onChange(event, name)}
          onBlur={onBlurFunc}
        />
      </div>

      {hasError && <p className="help is-danger">{`${label} is required`}</p>}
      {!hasInvalid && (
        <p className="help is-danger">{`${label} is invalid URL`}</p>
      )}
    </div>
  );
};
