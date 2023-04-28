import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  name: string,
  value: string,
  label?: string,
  required?: boolean,
  onChange?: (name: string, value: string) => void,
  valueIsCorrect?: boolean
};

function getRandomDigits() {
  return Math.random().toString().slice(2);
}

export const TextField: React.FC<Props> = ({
  name,
  value,
  label = name,
  required = false,
  onChange = () => {},
  valueIsCorrect = false,
}) => {
  // generage a unique id once on component load
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  // To show errors only if the field was touched (onBlur)
  const isUrl = name === 'imgUrl' || name === 'imdbUrl';
  const [touched, setToched] = useState(false);
  const hasError = touched && required && !value;
  const isInvalidValue = isUrl && valueIsCorrect && touched;

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
          onChange={event => {
            event.preventDefault();
            onChange(
              name, event.currentTarget.value,
            );
          }}
          onBlur={() => setToched(true)}
        />
      </div>

      {hasError && (
        <p className="help is-danger">{`${label} is required`}</p>
      )}

      {isInvalidValue && !hasError && (
        <p className="help is-danger">{`${label} is incorrect`}</p>
      )}
    </div>
  );
};
