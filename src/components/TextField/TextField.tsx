import classNames from 'classnames';
import React, { useState } from 'react';

export enum URLTypes {
  ImdbUrl = 'imdbUrl',
  imgUrl = 'imgUrl',
}

type Props = {
  name: string;
  value: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  onChange?: (newValue: string) => void;
};

function getRandomDigits() {
  return Math.random().toFixed(16).slice(2);
}

export const checkURL = (value: string): boolean => {
  const pattern =
    // eslint-disable-next-line max-len
    /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

  return pattern.test(value.trim());
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
  const hasError = touched && required && !value;
  const urlType = name === URLTypes.ImdbUrl || name === URLTypes.imgUrl;
  const hasInvalidURL = urlType && !checkURL(value) && !hasError && touched;

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
          onChange={event => onChange(event.target.value)}
          onBlur={() => setTouched(true)}
        />
      </div>

      {hasError && <p className="help is-danger">{`${label} is required`}</p>}
      {hasInvalidURL && <p className="help is-danger">{`Invalid URL`}</p>}
    </div>
  );
};
