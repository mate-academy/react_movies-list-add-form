import classNames from 'classnames';
import React, { useState } from 'react';
import { useField } from 'formik';

type Props = {
  name: string,
  label?: string,
};

function getRandomDigits() {
  return Math.random().toString().slice(2);
}

export const TextField: React.FC<Props> = ({
  name,
  label = name,
}) => {
  const [field, meta] = useField(name);
  // generage a unique id once on component load
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

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
            'is-danger': meta.touched && meta.error,
          })}
          type="text"
          placeholder={`Enter ${label}`}
          {...field}
        />
      </div>

      {meta.touched && meta.error && (
        <p className="help is-danger">{`${label} is required`}</p>
      )}
    </div>
  );
};
