import React from 'react';
import classNames from 'classnames';
import { InputShape } from '../Shapes/InputShape';

export const Input = ({ inputValue, inputName, error, addChange }) => {
  const titleFormatting = (title) => {
    return title[0].toUpperCase() + title.slice(1);
  };

  return (
    <div className="field">
      <label
        htmlFor={inputName}
      >
        {
          titleFormatting(inputName)
        }
        <input
          type="text"
          name={inputName}
          id={inputName}
          value={inputValue}
          onChange={addChange}
        />

        <p className={classNames(
          { 'ui red message': error },
        )}
        >
          {
            error
              ? `Field ${inputName} is required`
              : ''
          }
        </p>
      </label>
    </div>
  );
};

Input.propTypes = InputShape;
