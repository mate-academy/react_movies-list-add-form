import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  name: string,
  value: string,
  label?: string,
  required?: boolean,
  onChange?: (newValue: string, key: string) => void,
  isUrl?: boolean,
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
  isUrl,
}) => {
  // generage a unique id once on component load
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  // To show errors only if the field was touched (onBlur)
  const [isTouched, setIsToched] = useState(false);

  const url = name === 'imdbUrl' || name === 'imgUrl';

  const hasError = url
    ? isTouched && required && !isUrl
    : isTouched && required && !value.trim();

  return (
    <div className="field">
      <label className="label" htmlFor={id}>
        {label}
      </label>

      <div className="control">
        <input
          id={id}
          name={name}
          data-cy={`movie-${name}`}
          className={classNames(
            'input', {
              'is-danger': hasError,
            },
          )}
          type="text"
          placeholder={`Enter ${label}`}
          value={value}
          onChange={event => onChange(name, event.target.value)}
          onBlur={() => setIsToched(true)}
        />
      </div>

      {(hasError && !url) && (
        <p className="help is-danger">{`${label} is required`}</p>
      )}
      {(hasError && url) && (
        <p className="help is-danger">{`${label} mast be a valid URL`}</p>
      )}
    </div>
  );
};
