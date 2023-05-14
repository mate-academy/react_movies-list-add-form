import classNames from 'classnames';
import React, { useState, useEffect } from 'react';

type Props = {
  name: string,
  value: string,
  label?: string,
  required?: boolean,
  touchedName: boolean,
  touchedImgUrl: boolean,
  touchedImdbUrl: boolean,
  touchedImdbId: boolean,
  setTitle: (newValue: string) => void,
  setDescription: (newValue: string) => void,
  setImgUrl: (newValue: string) => void,
  setImdbUrl: (newValue: string) => void,
  setimdbId: (newValue: string) => void,
  setIsDisabled: (newValue: boolean) => void,
  setTouchedName: (newValue: boolean) => void,
  setTouchedImgUrl: (newValue: boolean) => void,
  setTouchedImdbId: (newValue: boolean) => void,
  setTouchedImdbUrl: (newValue: boolean) => void,
};

function getRandomDigits() {
  return Math.random().toString().slice(2);
}

export const TextField: React.FC<Props> = ({
  name,
  value,
  label = name,
  required = false,
  touchedName,
  touchedImgUrl,
  touchedImdbUrl,
  touchedImdbId,
  setTitle,
  setIsDisabled,
  setDescription,
  setImgUrl,
  setImdbUrl,
  setimdbId,
  setTouchedName,
  setTouchedImgUrl,
  setTouchedImdbId,
  setTouchedImdbUrl,
}) => {
  const [id] = useState(() => `${name}-${getRandomDigits()}`);
  const [hasError, setHasError] = useState(touchedName && required && !value);

  const onChange = (event: string) => {
    if (name === 'title') {
      setTitle(event);
    } else if (name === 'description') {
      setDescription(event);
    } else if (name === 'imgUrl') {
      setImgUrl(event);
    } else if (name === 'imdbUrl') {
      setImdbUrl(event);
    } else if (name === 'imdbId') {
      setimdbId(event);
    }
  };

  const blurring = () => {
    switch (name) {
      case 'title':
        setTouchedName(true);
        break;
      case 'imgUrl':
        setTouchedImgUrl(true);
        break;
      case 'imdbUrl':
        setTouchedImdbUrl(true);
        break;
      case 'imdbId':
        setTouchedImdbId(true);
        break;
      default:
        setTouchedName(true);
    }
  };

  useEffect(() => {
    switch (name) {
      case 'title':
        setHasError(touchedName && required && !value);
        break;
      case 'imgUrl':
        setHasError(touchedImgUrl && required && !value);
        break;
      case 'imdbUrl':
        setHasError(touchedImdbUrl && required && !value);
        break;
      case 'imdbId':
        setHasError(touchedImdbId && required && !value);
        break;
      default:
        setHasError(touchedName && required && !value);
    }

    if (value.length > 0 && name === 'title') {
      setTouchedName(false);
    } else if (value.length > 0 && name === 'imgUrl') {
      setTouchedImgUrl(false);
    } else if (value.length > 0 && name === 'imdbUrl') {
      setTouchedImdbUrl(false);
    } else if (value.length > 0 && name === 'imdbId') {
      setTouchedImdbId(false);
    }

    if (!touchedName
      && !touchedImgUrl
      && !touchedImdbUrl
      && !touchedImdbId) {
      setIsDisabled(false);
    }
  }, [touchedName,
    touchedImgUrl,
    touchedImdbUrl,
    touchedImdbId,
    value]);

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
          onChange={event => {
            onChange(event.target.value);
          }}
          onBlur={() => {
            blurring();
          }}
        />
      </div>

      {hasError && (
        <p className="help is-danger">{`${label} is required`}</p>
      )}
    </div>
  );
};
