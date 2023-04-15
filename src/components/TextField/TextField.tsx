import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  name: string,
  value: string,
  label?: string,
  required?: boolean,
  isValidateUrl?: (newValue: string) => boolean | undefined,
  onChange?: (newValue: string) => void,
};

function getRandomDigits() {
  return Math.random().toString().slice(2);
}

export const TextField: React.FC<Props> = ({
  name,
  value,
  label = name,
  required = false,
  isValidateUrl = () => {},
  onChange = () => {},
}) => {
  // generage a unique id once on component load
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  // To show errors only if the field was touched (onBlur) setErrorValidation
  const [touched, setToched] = useState(false);
  const [errorValidate, setErrorValidate] = useState(false);
  const hasError = touched && required && !value;
  const hasValidationError = errorValidate;

  // const validateError = () => {
  //   setErrorValidate(true);
  // };

  const validateUrl = () => {
    if (!isValidateUrl(value)) {
      setErrorValidate(false);
    }

    setErrorValidate(true);
  };

  // const validation = (url: string) => {
  //   // eslint-disable-next-line max-len
  //   const pattern = new RegExp(/^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/);
  //   console.log(pattern.test(url));

  //   return pattern.test(url);
  // };

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
          value={value}
          onChange={event => [onChange(event.target.value), validateUrl]}
          onBlur={() => [setToched(true)]}

        />
      </div>

      {hasValidationError && (
        <p className="help is-danger">Url is not correct</p>
      )}

      {hasError && (
        <p className="help is-danger">{`${label} is required`}</p>
      )}
    </div>
  );
};
