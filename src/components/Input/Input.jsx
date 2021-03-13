import React from 'react';

import classNames from 'classnames';
import PropTypes from 'prop-types';
import { ErrorType } from '../../Types/types';
import './Input.scss';

export function Input({
  name,
  value,
  onChange,
  onBlur,
  hasWarning,
}) {
  return (
    <>
      <label
        className="NewMovie__label"
        htmlFor={name}
      >
        {`${name}: `}
      </label>
      <input
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder="Type here"
        id={name}
        className={classNames('NewMovie__input',
          { NewMovie__input_warning: hasWarning[name] })}
      />
      <div
        className={classNames('NewMovie__message',
          { NewMovie__message_warning: hasWarning[name] })}
      >
        {`${name} is required`}
      </div>
    </>
  );
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onBlur: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  hasWarning: ErrorType.isRequired,
};
