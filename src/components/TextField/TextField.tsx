import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  name: string,
  label?: string,
  required?: boolean,
  value: string,
  onChange: (newValue: string) => void,
  handleError: (name: string, error: boolean) => void,
};

function getRandomDigits() {
  return Math.random().toString().slice(2);
}

export const TextField: React.FC<Props> = ({
  name,
  label = name,
  required = false,
  value,
  onChange,
  handleError,
}) => {
  // generage a unique id once on component load
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  // eslint-disable-next-line max-len
  const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

  // To show errors only if the field was touched (onBlur)
  const [touched, setToched] = useState(false);
  const hasError = name === 'imgUrl' || name === 'imdbUrl'
    ? (touched && required && (value === '' || !pattern.test(value)))
    : touched && required && value === '';

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
          placeholder={`Enter ${label}`}
          onChange={event => {
            onChange(event.target.value.trim());
            handleError(name, hasError);
          }}
          onBlur={() => setToched(true)}
        />
      </div>

      {hasError && (
        <p className="help is-danger">{`${label} is required`}</p>
      )}
    </div>
  );
};
