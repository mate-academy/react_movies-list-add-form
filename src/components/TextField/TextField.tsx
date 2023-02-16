import classNames from 'classnames';
import { useState, ChangeEvent } from 'react';
import { CommonValues } from '../../CommonValues';

type Props = {
  name: string;
  value: string;
  label?: string;
  required?: boolean;
  onChange?: (e: ChangeEvent) => void;
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
}) => {
  // generage a unique id once on component load
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  // To show errors only if the field was touched (onBlur)
  const [touched, setToched] = useState(false);
  const hasError = touched && required && !value;

  const isUrlValid
    = touched
    && !CommonValues.VALIDATE_URL_REGEX.test(value)
    && (name === 'imgUrl' || name === 'imdbUrl');

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
          name={name}
          value={value}
          onChange={(event) => onChange(event)}
          onBlur={() => setToched(true)}
        />
      </div>

      {hasError && <p className="help is-danger">{`${label} is required`}</p>}
      {isUrlValid && (
        <p className="help is-danger">{`${label} is not valid`}</p>
      )}
    </div>
  );
};
