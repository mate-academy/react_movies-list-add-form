import React from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line max-len
const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

export const FormElement = ({ type, getLabelInfo, name, text, value }) => {
  const validation = (name === 'imgUrl' || name === 'imdbUrl')
    && !pattern.test(text)
    && text.length > 0;

  return (
    <>
      <label className="addMovieForm__label">
        { name }
        { type === 'text' ? (
          <input
            className={validation ? 'incorrect' : ''}
            value={value}
            onChange={getLabelInfo}
            name={name}
            type="text"
          />
        )
          : (
            <textarea
              value={value}
              onChange={getLabelInfo}
              name={name}
            />
          )
        }
      </label>

      { validation ? <div className="wrong">ImdbUrl wrong format</div> : '' }
    </>
  );
};

FormElement.defaultProps = {
  text: '',
};

FormElement.propTypes = {
  type: PropTypes.string.isRequired,
  getLabelInfo: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  text: PropTypes.string,
  value: PropTypes.string.isRequired,
};
