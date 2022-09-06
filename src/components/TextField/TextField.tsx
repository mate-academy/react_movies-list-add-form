import classNames from 'classnames';
import { useState } from 'react';

type Props = {
  name: string,
  value: string,
  label?: string,
  required?: boolean,
  pattern?: RegExp,
  onChange?: (name: string, newValue: string, hasError: boolean) => void,
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
}) => {
  // generage a unique id once on component load
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  // To show errors only if the field was touched (onBlur)
  const [touched, setToched] = useState(false);

  const testNoValue = (val: string) => required && !val;
  const hasRequiredError = touched && testNoValue(value);

  const testIncorrectPattern = (val: string) => !(pattern.test(val));
  const hasPatternError = touched && testIncorrectPattern(value);

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
            const currentValue = event.target.value;

            onChange(
              name,
              currentValue,
              testNoValue(currentValue) || testIncorrectPattern(currentValue),
            );
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
