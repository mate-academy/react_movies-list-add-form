import React from 'react';
import propTypes from 'prop-types';
import classNames from 'classnames';

import './inputfield.scss';

export const InputField = ({ title, value, onChange, isRequired, isValid }) => (
  <>
    <input
      type="text"
      name={title}
      className={classNames('input', { invalidInput: !isValid && isRequired })}
      // eslint-disable-next-line max-len
      placeholder={`${title[0].toUpperCase()}${title.slice(1)}${isRequired ? '*' : ''}`}
      value={value}
      onChange={onChange}
    />
    {!isValid && isRequired && (
      <p>
        {`Please enter the ${title}`}
      </p>
    )}
  </>
);

InputField.propTypes = {
  title: propTypes.string.isRequired,
  value: propTypes.string.isRequired,
  onChange: propTypes.func.isRequired,
  isRequired: propTypes.bool.isRequired,
  isValid: propTypes.bool.isRequired,
};
