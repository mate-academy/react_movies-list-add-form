import classNames from 'classnames';
import React, { useState, HTMLProps } from 'react';
import { checkIfUrl } from '../../utils/helper';

export const TextField: React.FC<HTMLProps<HTMLInputElement>> = ({
  required = false,
  onChange = () => {},
  ...props
}) => {
  const [touched, setTouched] = useState(false);
  const [urlError, setUrlError] = useState(false);

  const {
    name,
    label,
    value,
    id,
  } = props;

  const hasError = touched && required && !value;
  const isUrlInput = name === 'imdbUrl' || name === 'imgUrl';

  return (
    <div className="field">
      <label className="label" htmlFor={id}>
        {label}
      </label>

      <div className="control">
        <input
          data-cy={`movie-${name}`}
          className={classNames('input', {
            'is-danger': hasError,
          })}
          onChange={(e) => {
            onChange(e);
            setUrlError(false);
          }}
          onBlur={() => {
            if (value && isUrlInput) {
              setUrlError(!checkIfUrl(value as string));
            }

            setTouched(true);
          }}
          {...props}
        />
      </div>

      {hasError && <p className="help is-danger">{`${label} is required`}</p>}

      {urlError && (
        <p className="help is-danger">You should input proper URL</p>
      )}
    </div>
  );
};
