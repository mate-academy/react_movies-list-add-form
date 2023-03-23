import classNames from 'classnames';
import React, { ChangeEvent, useState } from 'react';
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

const isInputValid = (pattern: RegExp | null, text: string): boolean => {
  if (pattern) {
    return pattern.test(text);
  }

  if (pattern) {
    return text !== '';
  }

  return true;
};

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
  const hasInvalidLink = !isValid && validationPattern && value;

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      value: inputValue,
    } = event.target;

    onChange(
      name,
      inputValue,
      isInputValid(validationPattern || null, inputValue),
    );
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
            'is-danger': hasError || hasInvalidLink,
          })}
          type="text"
          placeholder={`Enter ${label}`}
          value={value}
          onChange={handleInputChange}
          onBlur={() => setToched(true)}
        />
      </div>

      {hasError && (
        <p className="help is-danger">
          {`${label} is required`}
        </p>
      )}

      {hasInvalidLink && (
        <p className="help is-danger">
          Link must start with www. or https://
          {name === FieldType.IMAGEURL && ' and end with .jpeg/.png/etc.'}
        </p>
      )}
    </div>
  );
};
