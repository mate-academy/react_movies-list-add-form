import classNames from 'classnames';
import { useState } from 'react';

type Props = {
  name: string,
  value: string,
  label?: string,
  required?: boolean,
  pattern?: RegExp,
  onChange?: (name: string, newValue: string) => void,
  onError?: (name: string, hasError: boolean) => void,
};

function getRandomDigits() {
  return Math.random().toString().slice(2);
}

export const TextField: React.FC<Props> = ({
  name,
  value,
  label = name,
  required = false,
  pattern = /.*/,
  onChange = () => {},
  onError = () => {},
}) => {
  // generage a unique id once on component load
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  // To show errors only if the field was touched (onBlur)
  const [touched, setToched] = useState(false);
  const hasRequiredError = touched
    && required
    && !value;

  const hasPatternError = touched
    && !(pattern.test(value));

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
            'is-danger': hasRequiredError || hasPatternError,
          })}
          type="text"
          placeholder={`Enter ${label}`}
          value={value}
          onChange={event => {
            onError(name, hasRequiredError || hasPatternError);
            onChange(name, event.target.value);
          }}
          onBlur={() => setToched(true)}
        />
      </div>

      {hasRequiredError && (
        <p className="help is-danger">{`${label} is required`}</p>
      )}
      {!hasRequiredError && hasPatternError && (
        <p className="help is-danger">{`${label} is incorrect`}</p>
      )}
    </div>
  );
};
