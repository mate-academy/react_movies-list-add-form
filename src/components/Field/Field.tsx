/* eslint-disable react/require-default-props */
import React, { useState } from 'react';
import classNames from 'classnames';

interface Props {
  id: string;
  value: string;
  label: string;
  type: string;
  required?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onValidate?: (key: string, value: string) => boolean;
}

export const Field: React.FC<Props> = ({
  id,
  value,
  label,
  type,
  required = false,
  onChange,
  onValidate = null,
}) => {
  const [isValidated, setIsValidated] = useState(true);

  return (
    <div className="field">
      <label htmlFor={id}>
        {`${label}${required ? '*' : ''}`}
        <div className="control">
          <input
            id={id}
            type={type}
            className="input"
            value={value}
            onChange={onChange}
            onBlur={() => {
              if (onValidate) {
                setIsValidated(onValidate(id, value));
              }
            }}
            required={required}
          />
        </div>
        <p className={classNames(
          'help is-danger',
          {
            'is-invisible': isValidated,
          },
        )}
        >
          This field is invalid
        </p>
      </label>
    </div>
  );
};
