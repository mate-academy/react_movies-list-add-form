import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  name: string,
  value: string,
  label?: string,
  required?: boolean,
  isValid?: boolean,
  onChange?: (newValue: string) => void,
  setIsValid?: (valid: boolean) => void,
};

function getRandomDigits() {
  return Math.random().toString().slice(2);
}

export const TextField: React.FC<Props> = ({
  name,
  value,
  label = name,
  required = false,
  isValid = true,
  onChange = () => { },
  setIsValid = () => { },
}) => {
  // generage a unique id once on component load
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  // To show errors only if the field was touched (onBlur)
  const [touched, setToched] = useState(false);
  const hasError = touched && required && !value;
  const isVerified = touched && !isValid;

  const validateFields = (text: string) => {
    // eslint-disable-next-line max-len
    const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

    return pattern.test(text);
  };

  const handleOnChange = (text: string) => {
    if (name === 'imgUrl' || name === 'imdbUrl') {
      setIsValid(validateFields(text));
    }

    onChange(text);
  };

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
            'is-danger': hasError || isVerified,
          })}
          type="text"
          placeholder={`Enter ${label}`}
          value={value}
          onChange={event => handleOnChange(event.target.value)}
          onBlur={() => setToched(true)}
        />
      </div>

      {(hasError && (
        <p className="help is-danger">{`${label} is required`}</p>
      ))
      || (isVerified && (
        <p className="help is-danger">{`${label} is not valid`}</p>
      ))}

    </div>
  );
};
