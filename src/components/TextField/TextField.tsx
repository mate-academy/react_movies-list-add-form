import classNames from 'classnames';
import React, { useState, useMemo, useEffect } from 'react';
import { LINK_REGEXP } from '../../constants/validation';
import { initValue } from '../../constants/initial-values';

type Props = {
  name: string,
  label?: string,
  required?: boolean,
  editMovie: (title: string, value: string) => void,
  approveField?: (name: string, newSet: boolean) => void,
};

function getRandomDigits() {
  return Math.random().toString().slice(2);
}

export const TextField: React.FC<Props> = ({
  name,
  label = name,
  required = false,
  approveField,
  editMovie,
}) => {
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  const [isFieldCompleted, setFieldCompleted] = useState(false);

  const [value, setValue] = useState(initValue);

  const hasError = useMemo(() => {
    const isEmpty = required && !value.trim();

    const validUrl = name.toLocaleLowerCase().includes('url')
      ? LINK_REGEXP.test(value.trim())
      : true;

    return (isEmpty || !validUrl);
  }, [value]);

  useEffect(() => {
    approveField?.(name, !hasError);

    if (!hasError) {
      editMovie(name, value);
    }
  }, [value]);

  return (
    <div className="field">
      <label className="label" htmlFor={id}>
        {label}
      </label>

      <div className="control">
        <input
          id={id}
          data-cy={`movie-${name}`}
          className={classNames('input', {
            'is-danger': hasError && isFieldCompleted,
          })}
          type="text"
          placeholder={`Enter ${label}`}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          onBlur={() => setFieldCompleted(true)}
          onFocus={() => setFieldCompleted(false)}
        />
      </div>

      {hasError && isFieldCompleted && (
        <p className="help is-danger">{`${label} is required`}</p>
      )}
    </div>
  );
};
