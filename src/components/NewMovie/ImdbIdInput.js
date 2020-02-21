import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

export class ImdbIdInput extends Component {
  state = {
    isValid: false,
  }

  validateForm = () => {
    const { imdbId } = this.props;

    if (!imdbId) {
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
    const { imdbId } = this.props;
    const { isValid } = this.state;

    return (
      <label className={cx({
        form__label: true, 'form__not-valid': isValid,
      })}
      >
        <p>IMDb id:</p>
        <input
          className="form__input"
          value={imdbId}
          id="imdbId"
          onChange={this.inputChange}
          onBlur={this.validateForm}
          autoComplete="off"
        />
      </label>
    );
  }
}

ImdbIdInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  imdbId: PropTypes.string.isRequired,
};
