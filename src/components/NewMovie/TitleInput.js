import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

export class TitleInput extends Component {
  state = {
    isValid: false,
  }

  validateForm = (event) => {
    const { title } = this.props;

    if (!title) {
      this.setState({
        isValid: true,
      });
    }
  }

  inputChange = (event) => {
    const { onChange } = this.props;

    onChange(event);

    this.setState({
      isValid: false,
    });
  }

  render() {
    const { title } = this.props;
    const { isValid } = this.state;

    return (
      <label className={cx({
        form__label: true, 'form__not-valid': isValid,
      })}
      >
        <p>Title:</p>
        <input
          className="form__input"
          value={title}
          id="title"
          onChange={this.inputChange}
          onBlur={this.validateForm}
          autoComplete="off"
        />
      </label>
    );
  }
}

TitleInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};
