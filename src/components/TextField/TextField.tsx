import classNames from 'classnames';
import React, { useState } from 'react';
import { FieldType } from '../../types/typedefs';

type Props = {
  name: string,
  value: string,
  isValid?: boolean,
  label?: string,
  required?: boolean,
  onChange?: HandleTextFieldType,
  validationPattern?: RegExp,
};

export type HandleTextFieldType = (
  name: string,
  value:string,
  status: boolean
) => void;

function getRandomDigits() {
  return Math.random().toString().slice(2);
}

export const TextField: React.FC<Props> = ({
  name,
  value,
  isValid = false,
  label = name,
  required = false,
  onChange = () => {},
  validationPattern,
}) => {
  const [id] = useState(() => `${name}-${getRandomDigits()}`);
  const [touched, setToched] = useState(false);

  const hasError = touched && required && !value;
  const hasInvalidError = !isValid && validationPattern && value;

  const isInputValid = (text: string): boolean => {
    if (validationPattern) {
      return validationPattern.test(text);
    }

    if (required) {
      return text !== '';
    }

    return true;
  };

  return (
    <div className="field">
      <label className="label" htmlFor={id}>
        {label}
      </label>

      <div className="control">
        <input
          name={name}
          id={id}
          data-cy={`movie-${name}`}
          className={classNames('input', {
            'is-danger': hasError || hasInvalidError,
          })}
          type="text"
          placeholder={`Enter ${label}`}
          value={value}
          onChange={(event) => {
            const {
              value: inputValue,
            } = event.target;

            onChange(name, inputValue, isInputValid(inputValue));
          }}
          onBlur={() => setToched(true)}
        />
      </div>

      {hasError && (
        <p className="help is-danger">
          {`${label} is required`}
        </p>
      )}

      {hasInvalidError && (
        <p className="help is-danger">
          Link must start with www. or https://
          {name === FieldType.IMAGEURL && ' and end with .jpeg/.png/etc.'}
        </p>
      )}
    </div>
  );
};
