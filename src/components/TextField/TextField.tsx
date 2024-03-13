import classNames from 'classnames';
import React, { useState, ChangeEvent } from 'react';

type Props = {
  name: string;
  value: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  urlIsValid?: boolean;
  onChange?: (newValue: ChangeEvent<HTMLInputElement>) => void;
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
  urlIsValid,
  onChange = () => {},
}) => {
  // generage a unique id once on component load
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  // To show errors only if the field was touched (onBlur)
  const [touched, setTouched] = useState(false);
  const hasError = touched && required && !value;

  const isValidImgUrl =
    (name === 'imgUrl' || name === 'imdbUrl') &&
    touched &&
    !urlIsValid &&
    !hasError;
  const isErrorMessage = hasError || isValidImgUrl;
  const urlErrorMessage = isValidImgUrl ? 'Incorrect Url' : '';
  const requiredErrorMessage = hasError ? `${label} is required` : '';

  return (
    <div className="field">
      <label className="label" htmlFor={id}>
        {label}
      </label>

      <div className="control">
        <input
          type="text"
          name={name}
          id={id}
          data-cy={`movie-${name}`}
          className={classNames('input', {
            'is-danger': hasError || isValidImgUrl,
          })}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={() => setTouched(true)}
        />
      </div>

      {isErrorMessage && (
        <p className="help is-danger">
          {`${urlErrorMessage} ${requiredErrorMessage}`}
        </p>
      )}
    </div>
  );
};
