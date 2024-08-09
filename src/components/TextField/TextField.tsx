import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  name: string;
  value: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
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
  // generate a unique id once on component load
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  // To show errors only if the field was touched (onBlur)
  const [touched, setTouched] = useState(false);
  const [hasErrorValidation, setHasErrorValidation] = useState(true);
  const hasError = touched && required && !value;

  function hasErrorValid(inputName: string, inputValue: string) {
    if (inputName === 'imgUrl' || inputName === 'imdbUrl') {
      const pattern =
        // eslint-disable-next-line max-len
        /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

      const regex = new RegExp(pattern);

      setHasErrorValidation(regex.test(inputValue));
    } else {
      return;
    }
  }

  return (
    <div className="field">
      <label className="label" htmlFor={id}>
        {label}
      </label>

      <div className="control">
        <input
          name={name}
          type="text"
          id={id}
          data-cy={`movie-${name}`}
          className={classNames('input', {
            'is-danger': hasError,
          })}
          placeholder={placeholder}
          value={value}
          onChange={event => onChange(event)}
          onBlur={() => {
            setTouched(true);
            hasErrorValid(name, value);
          }}
        />
      </div>

      {hasError && <p className="help is-danger">{`${label} is required`}</p>}
      {!hasErrorValidation && (
        <p className="help is-info">{`${label} is not correctly, you don't show this information about film`}</p>
      )}
    </div>
  );
};
