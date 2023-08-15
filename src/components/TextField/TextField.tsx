import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  name: string,
  value: string,
  label?: string,
  placeholder?: string,
  submit?: boolean,
  isUrl?: (newValue: string) => boolean,
  onChange?: (newValue: string) => void,
  setError?: (newValue: boolean) => void,
  link?: boolean,
  required?: boolean,
};

function getRandomDigits() {
  return Math.random()
    .toFixed(16)
    .slice(2);
}

export const TextField: React.FC<Props> = ({
  name,
  value,
  label = name,
  placeholder = `Enter ${label}`,
  submit = false,
  isUrl = () => { },
  onChange = () => { },
  setError = () => { },
  link = false,
  required = false,
}) => {
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  const [touched, setTouched] = useState(false);

  const [url, setUrl] = useState('');

  const urlVerification = isUrl(url) as boolean;

  return (
    <div className="field">
      <label className="label" htmlFor={id}>
        {label}
      </label>

      <div className="control">
        <input
          type="text"
          id={id}
          data-cy={`movie-${name}`}
          className={classNames('input', {
            'is-danger': link
              ? (touched && !urlVerification && required && !submit)
              : touched && required && !value && !submit,
          })}
          placeholder={placeholder}
          value={value}
          onChange={event => {
            if (event.target.value.length === 0) {
              setError(false);
            }

            onChange(event.target.value);

            if (link) {
              setUrl(event.target.value);
            }
          }}
          onBlur={() => {
            setTouched(true);
          }}
        />
      </div>

      {((touched && value && !urlVerification && link && !submit)) && (
        <p className="help is-danger">{`${label} is not a link`}</p>
      )}

      {(touched && !value && required && !submit) && (
        <p className="help is-danger">{`${label} is required`}</p>
      )}
    </div>
  );
};
