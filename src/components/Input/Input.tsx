import classNames from 'classnames';
import React from 'react';
import {
  ChangeEvent,
  InputConditions,
  Keys,
} from '../../types/customTypes';

export const Input: React.FC<Props> = ({
  name,
  value,
  onChange,
  onblur,
  conditions,
}) => {
  const isInvalid = conditions[name] === false;

  return (
    <label htmlFor={name} className="new-movie__label">
      <input
        id={name}
        className={classNames('new-movie__input', {
          'new-movie__input--invalid': isInvalid,
        })}
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onblur}
        placeholder={name}
        required
      />
      <p className="new-movie__error">{isInvalid && `Invalid ${name}`}</p>
    </label>
  );
};

interface Props {
  name: Keys,
  value: string,
  onChange: (event: ChangeEvent) => void,
  onblur: (event: React.FocusEvent<HTMLInputElement, Element>) => void,
  conditions: InputConditions,
}
