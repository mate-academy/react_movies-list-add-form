import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  name: string,
  value: string,
  label?: string,
  placeholder?: string,
  required?: boolean,
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
  getHesError: (name: string, v: boolean) => void,
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
  getHesError,
}) => {
  // generage a unique id once on component load
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  // To show errors only if the field was touched (onBlur)
  const [errorMasege, setErrorMaseg] = useState('');

  // eslint-disable-next-line
  const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

  const verify = () => {
    if (required && !value) {
      setErrorMaseg(`${label} is required`);
      getHesError(name, true);

      return;
    }

    if (label.includes('URL') && !pattern.test(value)) {
      setErrorMaseg(`${label} is not valid URL`);
      getHesError(name, true);
    }
  };

  const change = (event: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMaseg('');
    onChange(event);
    getHesError(name, false);
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
            'is-danger': errorMasege,
          })}
          placeholder={placeholder}
          value={value}
          onChange={change}
          onBlur={verify}
          name={name}
        />
      </div>

      {errorMasege && (
        <p className="help is-danger">{errorMasege}</p>
      )}
    </div>
  );
};
