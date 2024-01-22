import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  name: string,
  value: string,
  label?: string,
  placeholder?: string,
  required?: boolean,
  onChange?: (newValue: string) => void,
  setHasError: (newValue: boolean) => void,
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
  onChange = () => { },
  setHasError,
}) => {
  // generage a unique id once on component load
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  // To show errors only if the field was touched (onBlur)
  const [errorMaseg, setErrorMaseg] = useState('');

  const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

  const verify = () => {
    if (required && !value) {
      setErrorMaseg(`${label} is required`);
      setHasError(true);

      return;
    }

    if (label.includes('URL') && !pattern.test(value)) {
      setErrorMaseg(`${label} is not valid URL`);
      setHasError(true);
    }
  };

  const change = (event: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMaseg('');
    onChange(event.target.value);
    setHasError(false);
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
            'is-danger': errorMaseg,
          })}
          placeholder={placeholder}
          value={value}
          onChange={change}
          onBlur={verify}
        />
      </div>

      {errorMaseg && (
        <p className="help is-danger">{errorMaseg}</p>
      )}
    </div>
  );
};
