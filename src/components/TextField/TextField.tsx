import classNames from 'classnames';
import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';

type Props = {
  name: string,
  label?: string,
  placeholder?: string,
  required?: boolean,
  getPattern?: (fieldName: string) => { value: RegExp, message: string },
};

const getRandomDigits = () => Math.random().toFixed(16).slice(2);

function getDefaultPattern(fieldName: string) {
  return {
    value: /./g,
    message: `${fieldName}'s pattern is not valid`,
  };
}

export const TextField: React.FC<Props> = ({
  name,
  label = name,
  placeholder = `Enter ${label}`,
  required = false,
  getPattern = getDefaultPattern,
}) => {
  const [id] = useState(() => `${name}-${getRandomDigits()}`);
  const { register, formState: { errors } } = useFormContext();
  const pattern = getPattern(label);

  return (
    <div className="field">
      <label className="label" htmlFor={id}>
        {label}
      </label>

      <div className="control">
        <input
          {...register(name, {
            pattern: {
              value: pattern.value,
              message: pattern.message,
            },
            required: {
              value: required,
              message: `${label} is required`,
            },
          })}
          type="text"
          id={id}
          data-cy={`movie-${name}`}
          placeholder={placeholder}
          className={classNames('input', {
            'is-danger': errors[name]?.message,
          })}
        />
      </div>

      {errors[name]?.message && (
        <p className="help is-danger">
          {errors[name]?.message}
        </p>
      )}
    </div>
  );
};
