import React, { ChangeEvent, useState } from 'react';
import classNames from 'classnames';

type Props = {
  name: string;
  value: string;
  label?: string;
  required?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const TextField: React.FC<Props> = ({
  name,
  value,
  label = name,
  required = false,
  onChange = () => {},
}) => {
  const [id] = useState(() => {
    const random = Math.random().toString().slice(2);

    return `${name}-${random}`;
  });

  const [touched, setTouched] = useState(false);
  const hasError = touched && required && !value;

  return (
    <div className="field">
      <label className="label" htmlFor={id}>
        {label}
      </label>
      <div className="control">
        <input
          id={id}
          data-cy={`movie-${name}`}
          className={classNames('input', { 'is-danger': hasError })}
          type="text"
          placeholder={`Enter ${label}`}
          value={value}
          onChange={(event: ChangeEvent<HTMLInputElement>) => onChange(event)}
          onBlur={() => setTouched(true)}
        />
      </div>
      {hasError && <p className="help is-danger">{`${label} is required`}</p>}
    </div>
  );
};
