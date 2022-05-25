import React, { memo } from 'react';
import './FormInput.scss';
import classNames from 'classnames';

interface Props {
  value: string,
  placeholder: string,
  isChange: (el: string) => void,
  isError?: (el: boolean) => void,
  error?: boolean,
  validationError?: boolean,
}

export const FormInput: React.FC<Props> = memo(({
  value,
  placeholder,
  error,
  isChange,
  isError,
  validationError,
}) => {
  return (
    <div className="movie-form__item">
      <label className="movie-form__label">
        <input
          type="text"
          value={value}
          placeholder={placeholder}
          className={classNames(
            'movie-form__input',
            { 'movie-form__input--error': error },
          )}
          onChange={event => {
            isChange(event.target.value);
            if (isError) {
              isError(false);
            }
          }}
        />

        {error && <p className="movie-form__error">This field is required</p>}
        {!error
        && validationError
        && (
          <p className="movie-form__error">
            This field has Validation Error
            Expected&#34;https://example.com/image.jpg&#34;
          </p>
        )}
      </label>
    </div>
  );
});
