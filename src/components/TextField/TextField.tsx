import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  name: string,
  value: string,
  label?: string,
  required?: boolean,
  onChange: (newName: string, newValue: string) => void,
};

function getRandomDigits() {
  return Math.random().toString().slice(2);
}

const validation = (url: string): boolean => {
  // eslint-disable-next-line max-len
  const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

  return pattern.test(url);
};

export const TextField: React.FC<Props> = ({
  name,
  value,
  label = name,
  required = false,
  onChange,
}) => {
  // generage a unique id once on component load
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  // To show errors only if the field was touched (onBlur)
  const [touched, setToched] = useState(false);
  const hasError = touched && required && !value.trim();

  const isValidLabels = ['imgUrl', 'imdbUrl'].includes(name);
  const isNotValid = isValidLabels && touched && !validation(value.trim());

  return (
    <div className="field">
      <label className="label" htmlFor={id}>
        {label}
      </label>

      <div className="control">
        <input
          id={id}
          data-cy={`movie-${name}`}
          className={classNames('input', {
            'is-danger': hasError,
          })}
          type="text"
          name={name}
          placeholder={`Enter ${label}`}
          value={value}
          onChange={event => {
            onChange(event.target.name, event.target.value);
          }}
          onBlur={() => setToched(true)}
        />
      </div>

      {hasError && (
        <p className="help is-danger">{`${label} is required`}</p>
      )}

      {isNotValid && (
        <p className="help is-danger">{`${label} is required`}</p>
      )}
    </div>
  );
};
