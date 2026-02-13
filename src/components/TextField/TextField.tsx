/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/indent */
import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  name: string;
  value: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  validate?: (value: string) => boolean;
  onValidityChange?: (isInvalid: boolean) => void;
  onChange?: (newValue: string) => void;
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
  onValidityChange,
  validate,
  onChange = () => {},
}) => {
  // generate a unique id once on component load
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  // To show errors only if the field was touched (onBlur)
  const [touched, setTouched] = useState(false);
  const hasError = touched && required && value.trim() === '';

  const [isLinkInvalid, setIsLinkInvalid] = useState(false);
  const hasLinkError = isLinkInvalid && touched && value.trim() !== '';

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
            'is-danger': hasError || hasLinkError,
          })}
          placeholder={placeholder}
          value={value}
          onChange={event => {
            const target = event.target.value;

            onChange(target);
            if (validate) {
              const invalid = validate(target);

              setIsLinkInvalid(invalid);
              if (onValidityChange) {
                onValidityChange(invalid);
              }
            }
          }}
          onBlur={() => setTouched(true)}
        />
      </div>

      {hasError && <p className="help is-danger">{`${label} is required`}</p>}
      {hasLinkError && (
        <p className="help is-danger">{`${label} is not valid Link`}</p>
      )}
    </div>
  );
};
