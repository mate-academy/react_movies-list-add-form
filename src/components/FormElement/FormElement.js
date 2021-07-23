import React from 'react';
import PropTypes from 'prop-types';
import './FormElement.scss';

// eslint-disable-next-line
const urlPattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

export class FormElement extends React.Component {
  state = {
    isValidInput: true,
    errorMessage: '',
  }

  validateInput = ({ name, value }) => {
    const { setValidationResult, validationKey } = this.props;

    if (value === '') {
      setValidationResult(validationKey, false);

      this.setState({
        isValidInput: false,
        errorMessage: `${name} is required`,
      });

      return;
    }

    if ((name === 'imgUrl') || (name === 'imdbUrl')) {
      if (!urlPattern.test(value)) {
        setValidationResult(validationKey, false);

        this.setState({
          isValidInput: false,
          errorMessage: `${name} wrong format`,
        });

        return;
      }
    }

    setValidationResult(validationKey, true);

    this.setState({
      isValidInput: true,
      errorMessage: '',
    });
  }

  render() {
    const { type, id, name, value, onChange, rows, cols }
    = this.props;

    const errorStyle = this.state.isValidInput
      ? {}
      : {
        border: `2px solid red`,
      };

    return (
      <label htmlFor={id} className="addMovieForm__label">
        {name}
        :
        {type === 'text'
          ? (
            <div className="addMovieForm__container">
              <input
                type="text"
                id={id}
                name={name}
                value={value}
                style={errorStyle}
                onChange={({ target }) => {
                  onChange(target.name, target.value);
                }}
                onBlur={({ target }) => {
                  this.validateInput(target);
                }}
              />
              <span>{this.state.errorMessage}</span>
            </div>
          )
          : (
            <textarea
              id={id}
              name={name}
              value={value}
              cols={cols}
              rows={rows}
              onChange={({ target }) => {
                onChange(target.name, target.value);
              }}
            />
          )}
      </label>
    );
  }
}

FormElement.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  validationKey: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  setValidationResult: PropTypes.func,
  rows: PropTypes.number,
  cols: PropTypes.number,
};

FormElement.defaultProps = {
  rows: 8,
  cols: 23,
  setValidationResult: () => {},
  validationKey: '',
};
