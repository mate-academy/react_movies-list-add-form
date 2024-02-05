import classNames from 'classnames';
import React, { useState } from 'react';
import { getRandomDigits } from '../../Servises/RandomDigits';

type Props = {
  name: string,
  value: string,
  label?: string,
  placeholder?: string,
  required?: boolean,
  onChange?: (newValue: string, name: string) => void,
  isValidImgUrl?: boolean;
  isValidImdbUrl?: boolean;
};

export const TextField: React.FC<Props> = ({
  name,
  value,
  label = name,
  placeholder = `Enter ${label}`,
  required = false,
  onChange = () => { },
  isValidImgUrl,
  isValidImdbUrl,
}) => {
  const [id] = useState(() => `${name}-${getRandomDigits()}`);
  const [touched, setTouched] = useState(false);
  const hasErrorBlur = touched && required && !value;
  const hasEroorValid = (!isValidImgUrl || !isValidImdbUrl)
    && required && touched;

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
            'is-danger': hasErrorBlur,
          })}
          placeholder={placeholder}
          value={value}
          onChange={(event) => {
            onChange(event.target.value, name);
          }}
          onBlur={() => setTouched(true)}
        />
      </div>

      {hasErrorBlur && (
        <p className="help is-danger">{`${label} is required`}</p>
      )}

      {hasEroorValid && value && (
        <p className="help is-danger">{`${label} isn't correct values`}</p>
      )}
    </div>
  );
};
