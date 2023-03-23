import classNames from 'classnames';
import React, { useState, ChangeEvent } from 'react';
import uniqid from 'uniqid';

type Props = {
  name: string,
  value: string,
  label: string,
  required?: boolean,
  onChange: (event: ChangeEvent<HTMLInputElement>) => void,
  onValidation?: (url: string) => boolean,
};

export const TextField: React.FC<Props> = ({
  name,
  value,
  label,
  required = false,
  onChange,
  onValidation,
}) => {
  const [id] = useState(uniqid(`${name}-`));
  const [touched, setToched] = useState(false);
  const hasError = touched && required && !value;
  const hasValidError = (onValidation)
    ? value && !onValidation(value)
    : false;

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
            'is-danger': hasError,
          })}
          type="text"
          placeholder={`Enter ${label}`}
          value={value}
          onChange={onChange}
          onBlur={() => setToched(true)}
        />
      </div>

      {hasError && (
        <p className="help is-danger">{`${label} is required`}</p>
      )}

      {hasValidError && (
        <p className="help is-danger">{`${label} is not valid`}</p>
      )}
    </div>
  );
};
