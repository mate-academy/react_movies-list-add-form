import classNames from 'classnames';
import React, { useState, useEffect } from 'react';
import { pattern } from '../../utils/pattern';

enum InputName {
  title = 'title',
  description = 'description',
  imgUrl = 'imgUrl',
  imdbUrl = 'imdbUrl',
  imdbId = 'imdbId',
}

type Props = {
  name: string,
  value: string,
  label?: string,
  placeholder?: string,
  required?: boolean,
  setHasError: (newValue: boolean) => void,
  onChange?: (newValue: string) => void,
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
  required = false,
  setHasError = () => {},
  onChange = () => {},
}) => {
  const [id] = useState(() => `${name}-${getRandomDigits()}`);
  const [touched, setToched] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const hasError = touched && required && !isValid;

  const validateInput = (nameType: InputName) => {
    switch (nameType) {
      case InputName.description:
        return true;

      case InputName.imgUrl:
      case InputName.imdbUrl:
        return pattern.isLink.test(value);

      default:
        return pattern.isNotEmpty.test(value);
    }
  };

  const handleBlur = () => {
    const nameType = name as keyof typeof InputName;

    setToched(true);
    setIsValid(validateInput(InputName[nameType]));
  };

  useEffect(() => {
    setHasError(document.querySelectorAll('.help').length !== 0);
  }, [isValid]);

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
            'is-danger': hasError,
          })}
          placeholder={placeholder}
          value={value}
          onChange={event => onChange(event.target.value)}
          onBlur={handleBlur}
        />
      </div>

      {hasError && (
        <p className="help is-danger">{`valid ${label} is required`}</p>
      )}
    </div>
  );
};
