import React from 'react';
import classNames from 'classnames';
import './input.css';
import PropTypes from 'prop-types';
// eslint-disable-next-line
export const urlPattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/

export class Input extends React.Component {
  state = {
    inputValidation: true,
    errorText: '',
  }

  checkValidation = (field) => {
    if (field.name === 'title' || field.name === 'imdbId') {
      field.value.length === 0
        ? this.setState({
          inputValidation: !!field.value.length,
          errorText: 'Is required',
        })
        : this.setState({
          inputValidation: !!field.value.length,
        });
    } else {
      field.value.length === 0
        ? this.setState({
          inputValidation: urlPattern.test(field.value),
          errorText: 'Is required',
        })
        : this.setState({
          inputValidation: urlPattern.test(field.value),
          errorText: 'Need URL format',
        });
    }

    this.props.onChange(field.name, field.value);
  }

  checkValue = (input) => {
    this.props.onChange(input.name, input.value);

    input.value.length === 0
      && this.setState({
        errorText: '',
        inputValidation: !!input.value.length,
      });
  }

  render() {
    const {
      title,
      name,
      value,
    } = this.props;

    const { inputValidation, errorText } = this.state;

    return (
      <label>
        {`${title} `}
        <input
          className={classNames(
            'input',{
            'app__input': !inputValidation,
            })
          }
          value={value}
          name={name}
          onChange={({ target }) => this.checkValue(target)}
          onBlur={({ target }) => this.checkValidation(target)}
        />
        <span
          className="app__error"
        >
          {inputValidation ? null : errorText}
        </span>
      </label>
    );
  }
}

Input.propTypes = {
  value: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
