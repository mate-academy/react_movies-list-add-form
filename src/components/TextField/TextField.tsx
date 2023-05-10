import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { Movie } from '../../types/Movie';

type Props = {
  name: string,
  value: Movie,
  label?: string,
  count: number,
  required: boolean,
  onChange?: (movie: Movie) => void,
  setDisabled: (value: boolean) => void,
};

function getRandomDigits() {
  return Math.random().toString().slice(2);
}

export const TextField: React.FC<Props> = ({
  name,
  value,
  label = name,
  count,
  required,
  onChange = () => {},
  setDisabled = () => {},
}) => {
  const isValueEmpty = Object.entries(value)
    .filter(item => item[0] !== 'description')
    .every(item => item[1] !== '');

  const [id] = useState(() => `${name}-${getRandomDigits()}`);
  const [touched, setToched] = useState(false);
  const hasError = touched && !value[name] && required;

  useEffect(() => setToched(false), [count]);

  const validUrl = (url: string) => {
    // eslint-disable-next-line max-len
    const pattern = new RegExp(/^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/);

    return pattern.test(url);
  };

  const isEqual = name === 'imgUrl' || name === 'imdbUrl';

  setDisabled(
    !isValueEmpty
    || !validUrl(value.imdbUrl)
    || !validUrl(value.imgUrl),
  );

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
          value={value[name]}
          onChange={event => onChange({ ...value, [name]: event.target.value })}
          onBlur={() => setToched(true)}
        />
      </div>
      {
        value[name] && !validUrl(value[name]) && isEqual
          && (<p className="help is-danger">Url is not correct</p>)
      }
      {hasError && (<p className="help is-danger">{`${label} is required`}</p>)}
    </div>
  );
};
