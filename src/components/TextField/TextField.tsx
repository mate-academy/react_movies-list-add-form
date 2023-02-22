import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  name: string,
  label?: string,
  required?: boolean,
  initValue: string,
  editMovie: (title: string, value: string) => void,
  approveField?: (name: string, newSet: boolean) => void,
  validateHref?: (value: string) => boolean,
};

function getRandomDigits() {
  return Math.random().toString().slice(2);
}

export const TextField: React.FC<Props> = ({
  name,
  label = name,
  required = false,
  initValue,
  approveField,
  editMovie,
  validateHref,
}) => {
  // generage a unique id once on component load
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  // To show errors only if the field was touched (onBlur)
  const [touched, setToched] = useState(false);
  const [value, setValue] = useState(initValue);
  let hasError = touched && required && !value;

  const onBlur = () => {
    setToched(true);

    if (validateHref) {
      hasError = !validateHref(value);
    }

    const isValid = !hasError;

    approveField?.(name, isValid);

    if (isValid) {
      editMovie(label, value);
    }
  };

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
            'is-danger': hasError,
          })}
          type="text"
          placeholder={`Enter ${label}`}
          value={value}
          onChange={event => setValue(event.target.value)}
          onBlur={onBlur}
        />
      </div>

      {hasError && (
        <p className="help is-danger">{`${label} is required`}</p>
      )}
    </div>
  );
};
