import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  name: string,
  value: string,
  label?: string,
  showError?: boolean,
  showErrorImg?: boolean,
  required?: boolean,
  onChange?: (newValue: React.ChangeEvent<HTMLInputElement>) => void,
};

function getRandomDigits() {
  return Math.random().toString().slice(2);
}

export const TextField: React.FC<Props> = ({
  name,
  value,
  label = name,
  showError,
  showErrorImg,
  required = false,
  onChange = () => {},
}) => {
  // generage a unique id once on component load
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  // To show errors only if the field was touched (onBlur)
  const [touched, setTouched] = useState(false);
  // const hasError = touched && required && !value;
  const hasError = touched && required && !value;
  const showErrorMessage = !hasError && touched && showError;
  // const showErrorMessage = touched && showError;
  const showErrorImgMessage = !hasError && touched && showErrorImg;

  return (
    <div className="field">
      <label className="label" htmlFor={id}>
        {label}
      </label>

      <div className="control">
        <input
          id={id}
          name={name}
          data-cy={`movie-${name}`}
          className={classNames('input', {
            'is-danger': hasError,
          })}
          type="text"
          placeholder={`Enter ${label}`}
          value={value}
          // onChange={event => onChange(event.target.value)}
          onChange={event => onChange(event)}
          onBlur={() => setTouched(true)}
        />
      </div>

      {hasError && (
        <p className="help is-danger">{`${label} is required`}</p>
      )}
      { showErrorMessage && (
        <p className="help is-info">{`${label} must be correct`}</p>
      )}
      { showErrorImgMessage && (
        <p className="help is-info">{`${label} must be correct`}</p>
      )}
    </div>
  );
};
