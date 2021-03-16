import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export const Input = ({
  labelText,
  value,
  name,
  changeHandle,
  title,
  textOnError,
}) => (
  <div className="form__field">
    <label className="form__label" htmlFor="title">
      {labelText}
    </label>
    <input
      className={classNames(
        'form__input',
        { 'form__input--error': title },
      )}
      id={name}
      name={name}
      value={value}
      onChange={changeHandle}
      placeholder={name}
      required={name !== 'description'}
    />
    {title
    && <div className="error">{textOnError}</div>}
  </div>
);

Input.propTypes = {
  labelText: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  textOnError: PropTypes.string.isRequired,
  changeHandle: PropTypes.func.isRequired,
};
