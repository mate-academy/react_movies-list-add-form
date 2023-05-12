import classNames from 'classnames';
import React, { useEffect, useState } from 'react';

type Props = {
  name: string,
  value: string,
  label?: string,
  count: number,
  required: boolean,
  onChange: (name: string, value: string) => void,
  isEqual: boolean,
};

type Label = {
  [key : string]: string,
};

function getRandomDigits() {
  return Math.random().toString().slice(2);
}

export const TextField: React.FC<Props> = ({
  name,
  value,
  label = name,
  count,
  required = false,
  onChange = () => {},
  isEqual,
}) => {
  const [id] = useState(() => `${name}-${getRandomDigits()}`);
  const [touched, setToched] = useState(false);
  const hasError = touched && !value && required;

  useEffect(() => {
    setToched(false);
  }, [count]);

  const correctLabel: Label = {
    title: 'Title',
    description: 'Description',
    imgUrl: 'Image Url',
    imdbUrl: 'Imdb Url',
    imdbId: 'Imdb ID',
  };

  return (
    <div className="field">
      <label className="label" htmlFor={id}>
        {correctLabel[label]}
      </label>

      <div className="control">
        <input
          id={id}
          data-cy={`movie-${name}`}
          className={classNames('input', {
            'is-danger': hasError,
          })}
          type="text"
          placeholder={`Enter ${correctLabel[label]}`}
          defaultValue={value}
          onChange={event => onChange(name, event.target.value.trim())}
          onBlur={() => setToched(true)}
        />
      </div>
      {
        value && !isEqual
          && (<p className="help is-danger">Url is not correct</p>)
      }
      {hasError && (<p className="help is-danger">{`${label} is required`}</p>)}
    </div>
  );
};
