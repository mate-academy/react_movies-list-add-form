import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  name: string,
  value: string,
  label?: string,
  required?: boolean,
  onChange?: (newValue: string) => void,
};

function getRandomDigits() {
  return Math.random().toString().slice(2);
}

export const TextField: React.FC<Props> = ({
  name,
  value,
  label = name,
  required = false,
  onChange = () => { },
}) => {
  // generage a unique id once on component load
  const [id] = useState(() => `${name}-${getRandomDigits()}`);
  // const [imgUrlValid, setImageURLValid] = useState(false);
  // const [imdbUrlValid, setImdbURLValid] = useState(false);

  // eslint-disable-next-line max-len
  // // const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

  // // const validFieldUrl = () => {
  // if (name === 'imgUrl' && name.match(pattern)) {
  //   setImageURLValid(true);
  // } else if (name === 'imgUrl' && !name.match(pattern)) {
  //   return setImageURLValid(false);
  // }

  // if (name === 'imdbUrl' && name.match(pattern)) {
  //   setImdbURLValid(true);
  // } else if (name === 'imdbUrl' && !name.match(pattern)) {
  //   setImdbURLValid(false);
  // }
  // };

  // To show errors only if the field was touched (onBlur)
  const [touched, setToched] = useState(false);
  const hasError = touched && required && !value;

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
          onChange={event => onChange(event.target.value)}
          onBlur={() => setToched(true)}
        />
      </div>

      {hasError && (
        <p className="help is-danger">{`${label} is required`}</p>
      )}

      {/* {(imgUrlValid || imdbUrlValid) && (
        <p className="help is-danger">{`${label} is not correct`}</p>
      )} */}
    </div>
  );
};
