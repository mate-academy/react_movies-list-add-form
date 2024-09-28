import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  name: string;
  value: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  onChange?: (newValue: string) => void;
};

type InputTypes = 'title' | 'description' | 'imgUrl' | 'imdbUrl' | 'imdbId';

function getRandomDigits() {
  return Math.random().toFixed(16).slice(2);
}

export const TextField: React.FC<Props> = ({
  name,
  value,
  label = name,
  placeholder = `Enter ${label}`,
  required = false,
  // onChange = () => {},
}) => {
  // generate a unique id once on component load
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imdbId, setImdbId] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [isValueChanged, setIsValueChanged] = useState(false);

  function handleInputChange(
    inputType: InputTypes,
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    setIsValueChanged(true);

    switch (inputType) {
      case 'title':
        return setTitle(event.target.value);
      case 'description':
        return setDescription(event.target.value);
      case 'imdbId':
        return setImdbId(event.target.value);
      case 'imdbUrl':
        return setImdbUrl(event.target.value);
      case 'imgUrl':
        return setImgUrl(event.target.value);
      default:
        return;
    }
  }

  function handleValue(nameProperty: InputTypes) {
    switch (nameProperty) {
      case 'title':
        return title;
      case 'description':
        return description;
      case 'imdbId':
        return imdbId;
      case 'imdbUrl':
        return imdbUrl;
      case 'imgUrl':
        return imgUrl;
    }
  }

  // To show errors only if the field was touched (onBlur)
  const [touched, setTouched] = useState(false);
  const hasError = touched && required && !isValueChanged;

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
          value={handleValue(name as InputTypes)}
          onChange={event => handleInputChange(name as InputTypes, event)}
          onBlur={() => setTouched(true)}
          required={name !== 'description'}
        />
      </div>

      {hasError && <p className="help is-danger">{`${label} is required`}</p>}
    </div>
  );
};
