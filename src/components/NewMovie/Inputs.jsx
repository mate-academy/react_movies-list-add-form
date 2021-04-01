import React from 'react';
import PropTypes from 'prop-types';

function firstLetterUpperCase(string) {
  return string[0].toUpperCase() + string.slice(1);
}

export const Inputs = (props) => {
  const { inputValue, inputError, controlFocusHandle, onChangedInput } = props;

  return (
    <div>
      {Object.keys(inputValue).map(stateValue => (
        <label key={stateValue}>
          <p className="form__title">
            {firstLetterUpperCase(stateValue)}
          </p>
          <input
            type="text"
            name={stateValue}
            className={(inputError[stateValue])
              ? 'form__input input-error'
              : 'form__input'
            }
            placeholder={firstLetterUpperCase(stateValue)}
            value={inputValue[stateValue]}
            onBlur={controlFocusHandle}
            onChange={onChangedInput}
          />
          {inputError[stateValue] && (
            <p className="error">
              {`Please enter
                ${firstLetterUpperCase(stateValue)}
                `}
            </p>
          )}
        </label>
      ))}
    </div>
  );
};

Inputs.propTypes = {
  controlFocusHandle: PropTypes.func.isRequired,
  onChangedInput: PropTypes.func.isRequired,
  inputValue: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imgUrl: PropTypes.string.isRequired,
    imdbUrl: PropTypes.string.isRequired,
    imdbId: PropTypes.string.isRequired,
  }).isRequired,
  inputError: PropTypes.shape({
    title: PropTypes.bool.isRequired,
    description: PropTypes.bool.isRequired,
    imgUrl: PropTypes.bool.isRequired,
    imdbUrl: PropTypes.bool.isRequired,
    imdbId: PropTypes.bool.isRequired,
  }).isRequired,
};
